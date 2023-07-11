import { NextApiRequest, NextApiResponse } from 'next';
import { checkUserSessionApi } from '@/services/auth/check-session-api';
import { assignDealershipMachine } from '@/services/machine/query/assign-machine';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await checkUserSessionApi(req, res);
    if (!session) {
      res.status(401).json({
        message: 'No active session or is not authenticated',
      });
    }

    const { mid, id }: any = req.query;

    if (req.method === 'PUT') {
      // PUT /api/machines/${mid}/dealership/${id}
      const machine = await assignMachine(mid, id);
      res.status(200).json({ machine: machine, message: 'Assign success' });
    }
  } catch (error) {
    res.status(500).json({
      machine: null,
      message: 'Error in unassigning machine from dealership',
    });
  }
}

async function assignMachine(mid: string, id: string) {
  try {
    const machine = await assignDealershipMachine(mid, id);
    return machine;
  } catch (error) {
    throw error;
  }
}
