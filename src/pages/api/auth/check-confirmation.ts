import { checkUserExist } from '@/services/user/query/check-user-exist';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const confirm = await checkConfirmed(req);
      res
        .status(200)
        .json({ message: 'User validation checked', confirm: confirm });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function checkConfirmed(req: NextApiRequest) {
  try {
    const { uid }: any = req.query;
    const user = await checkUserExist(uid);
    const confirm = user?.invites_received[0]?.is_accepted;
    return confirm;
  } catch (error) {
    throw error;
  }
}
