import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../constants/db';
import {
  DangerReports,
  InformationNode,
  LocalDangerReports,
  LocalInformationNode,
} from '../../types/api';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('serverless-mysql')({
  config: db,
});

function isMarkerValid(data: unknown): data is InformationNode {
  const typedData = data as InformationNode;
  return (
    typedData.timestamp != undefined &&
    typedData.object_speed != undefined &&
    typedData.longitude != undefined &&
    typedData.latitude != undefined &&
    typedData.bicycle_speed != undefined &&
    typedData.distance != undefined
  );
}

function isLocalMarkerValid(data: unknown): data is LocalInformationNode {
  return (
    isMarkerValid(data) &&
    (data as LocalInformationNode).id !== undefined &&
    (data as LocalInformationNode).sync !== undefined
  );
}

function isDataValid(data: unknown): data is DangerReports {
  return Array.isArray(data) && (data as DangerReports).every(isMarkerValid);
}

function isLocalDataValid(data: unknown): data is LocalDangerReports {
  return (
    Array.isArray(data) &&
    (data as LocalDangerReports).every(isLocalMarkerValid)
  );
}

function isDeleteDataValid(data: unknown): data is Array<number> {
  return (
    Array.isArray(data) &&
    (data as Array<number>).every((i) => typeof i === 'number')
  );
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  switch (method) {
    case 'POST':
      if (!body) {
        res.status(400).end('No data provided');
      } else {
        if (isDataValid(body)) {
          body.forEach((d) => {
            mysql.query(
              'INSERT INTO markers (timestamp, distance, object_speed, bicycle_speed, latitude, longitude, sync) VALUES(?, ?, ?, ?, ?, ?, ?)',
              [
                d.timestamp,
                d.distance,
                d.object_speed,
                d.bicycle_speed,
                d.latitude,
                d.longitude,
                0,
              ]
            );
          });
          res.status(200).end('success');
        } else {
          res.status(400).end('Data provided invalid');
        }
      }
      break;
    case 'GET':
      const result = await mysql.query('SELECT * FROM markers');
      res.status(200).json(result);
      break;
    case 'DELETE':
      if (isDeleteDataValid(body)) {
        body.forEach((id) => {
          mysql.query('DELETE FROM markers WHERE id = ?', [id]);
        });
        res.status(200).end('success');
      } else {
        res.status(400).end('Data provided invalid');
      }
      break;
    case 'PATCH':
      if (isLocalDataValid(body)) {
        body.forEach(async (d) => {
          await mysql.query('UPDATE markers SET sync = ? WHERE id = ?', [
            d.sync,
            d.id,
          ]);
        });
        res.status(200).end('success');
      } else {
        res.status(400).end('Data provided invalid');
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
