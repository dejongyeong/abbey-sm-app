import { getSupabaseServerAdminClient } from '@/lib/supabase/admin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'PUT') {
      await resetPassword(req, res);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function resetPassword(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabaseServerAdminClient = getSupabaseServerAdminClient(req, res);

    const { uid, password } = req.body;

    const { error } = await supabaseServerAdminClient.auth.admin.updateUserById(
      uid,
      { password: password }
    );

    error
      ? res.status(400).json({ message: error.message })
      : res.status(200).json({
          message: 'Password reset successful. Login with new password',
        });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
