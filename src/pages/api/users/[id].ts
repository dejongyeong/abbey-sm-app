import { getSupabaseServerAdminClient } from '@/lib/supabase/admin';
import { checkUserSessionApi } from '@/services/auth/check-session-api';
import { deleteUserInDatabase } from '@/services/user/query/delete-user-db';
import { getSelectedUser } from '@/services/user/query/get-selected-user';
import { updateUser } from '@/services/user/query/update-user';
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

    if (req.method === 'DELETE') {
      // DELETE /api/users/[id]
      if (req.method === 'DELETE') {
        await deleteUserById(req, res, id);
        res.status(200).json({ message: 'User deleted successfully' });
      }
    }

    if (req.method === 'GET') {
      // GET /api/users/[id]
      if (req.method === 'GET') {
        const user = await getUserById(id);
        res.status(200).json({ user: user, message: 'Update success' });
      }
    }

    if (req.method === 'PUT') {
      // PUT /api/users/id
      const { params } = req.body;
      const supabaseServerAdminClient = getSupabaseServerAdminClient(req, res); // update supabase as well

      const user = await updateSelectedUser(
        id,
        params,
        supabaseServerAdminClient
      );

      res.status(200).json({ user: user, message: 'Update success' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error in manage users api' });
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

async function getUserById(id: any) {
  try {
    const user = await getSelectedUser(id);
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateSelectedUser(
  id: any,
  params: any,
  supabaseServerAdminClient: any
) {
  try {
    const user = updateUser(id, params);
    const { error } = await supabaseServerAdminClient.auth.admin.updateUserById(
      id,
      { email: params?.email }
    );

    if (!error) {
      return user;
    } else {
      throw new Error('Error while updating user');
    }
  } catch (error) {
    throw error;
  }
}
