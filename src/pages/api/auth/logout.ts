import { getSupabaseServerClient } from '@/lib/supabase/api-server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      await logout(req, res);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// only allow user to logout when there is a session
async function logout(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabaseServerClient = getSupabaseServerClient(req, res);
    const {
      data: { session },
    } = await supabaseServerClient.auth.getSession();

    if (!session) {
      res.status(401).json({ message: 'Unauthorized access' });
    }

    const { error } = await supabaseServerClient.auth.signOut();
    error
      ? res.status(400).json({ message: error.message })
      : res.status(200).json({ message: 'Logout Successful' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
