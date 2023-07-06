import { checkUserSessionApi } from '@/services/auth/check-session-api';
import createMachine from '@/services/machine/query/create-machine-query';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await checkUserSessionApi(req, res);
  if (!session) {
    res.status(401).json({
      machine: null,
      message: 'No active session or is not authenticated',
    });
  }

  if (req.method === 'POST') {
    const machine = await create(req, res);
    res.status(200).json({ machine: machine, message: 'Success' });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ roles: null, message: 'Method not allowed' });
  }
}

async function create(req: NextApiRequest, res: NextApiResponse) {
  try {
    const params = req.body;
    const machine = createMachine(params);
    return machine;
  } catch (error) {
    res.status(500).json({ machine: null, message: (error as Error).message });
  }
}
