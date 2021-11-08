import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../constants/db';
import { ApiResponse } from '../../types/api';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('serverless-mysql')({
  config: db,
});

function isDataValid(data: unknown): data is ApiResponse {
  return (
    Array.isArray(data) &&
    (data as ApiResponse).every(
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

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      const { body } = req;
      if (!body) {
        res.status(400).end('No data provided');
      } else {
        if (isDataValid(body)) {
          body.forEach((d) => {
            mysql.query(
              'INSERT INTO markers (timestamp, distance, object_speed, bicycle_speed, latitude, longitude) VALUES(?, ?, ?, ?, ?, ?)',
              [
                d.timestamp,
                d.distance,
                d.object_speed,
                d.bicycle_speed,
                d.latitude,
                d.longitude,
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
      mysql.query('SELECT * FROM markers').then((result) => {
        res.status(200).json(result);
      });
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
