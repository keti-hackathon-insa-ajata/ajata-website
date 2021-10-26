import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiResponse } from '../../types/api';

export default (_req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  res.status(200).json([
    {
      timestamp: 123456789,
      distance: 20,
      object_speed: 10,
      bicycle_speed: 30,
      coordinates: [43.6, 1.44],
    },
  ]);
};
