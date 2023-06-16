import { BASE_URL } from '@/config/constant';
import { getSupabaseServerAdminClient } from '@/lib/supabase/admin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      await recover(req, res);
    } else {
      res.status(405);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function recover(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabaseServerAdminClient = getSupabaseServerAdminClient(req, res);

    const { email } = req.body;
    const { data: user, error } =
      await supabaseServerAdminClient.auth.admin.generateLink({
        type: 'recovery',
        email: email,
        options: { redirectTo: `${BASE_URL}/auth/password/reset` },
      });

    console.log(user);

    // TODO: send email

    error
      ? res.status(400).json({ message: error.message })
      : res.status(200).json({ message: 'Password recovery link sent!' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
