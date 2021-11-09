import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../constants/db';
import { DangerReports } from '../../types/api';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('serverless-mysql')({
  config: db,
});

function isDataValid(data: unknown): data is DangerReports {
  return (
    Array.isArray(data) &&
    (data as DangerReports).every(
      (i) =>
        i.timestamp != undefined &&
        i.object_speed != undefined &&
        i.longitude != undefined &&
        i.latitude != undefined &&
        i.bicycle_speed != undefined &&
        i.distance != undefined
    )
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
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
