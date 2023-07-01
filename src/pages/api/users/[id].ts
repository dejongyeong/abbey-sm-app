import { getSupabaseServerAdminClient } from '@/lib/supabase/admin';
import { checkUserSessionApi } from '@/services/auth/check-session-api';
import { deleteUserInDatabase } from '@/services/user/query/delete-user-db';
import { NextApiRequest, NextApiResponse } from 'next';

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

    // DELETE /api/users/[id]
    if (req.method === 'DELETE') {
      await deleteUserById(req, res, id);
      res.status(200).json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function deleteUserById(
  req: NextApiRequest,
  res: NextApiResponse,
  id: any
) {
  try {
    await deleteUserInDatabase(id); // prisma delete the entire entry

    const supabase = getSupabaseServerAdminClient(req, res);
    await supabase.auth.admin.deleteUser(id); // delete from supabase
  } catch (error) {
    throw error;
  }
}
