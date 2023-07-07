import { NextApiRequest, NextApiResponse } from 'next';
import { checkUserSessionApi } from '@/services/auth/check-session-api';
import { unassignFarmManagerMachine } from '@/services/machine/query/unassign-machine';

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

    const { id } = req.query;

    if (req.method === 'DELETE') {
      // DELETE /api/machines/unassign/farm-manager/{$id}
      const machine = await unassignMachine(id);
      res.status(200).json({ machine: machine, message: 'Update success' });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        machine: null,
        message: 'Error in unassigning machine from farm manager',
      });
  }
}

async function unassignMachine(id: any) {
  try {
    const machine = await unassignFarmManagerMachine(id);
    return machine;
  } catch (error) {
    throw error;
  }
}
