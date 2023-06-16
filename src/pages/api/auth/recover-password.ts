import { BASE_URL, SENDGRID_CONFIG } from '@/config/constant';
import { getSupabaseServerAdminClient } from '@/lib/supabase/admin';
import { send } from '@/services/mail/send';
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

    if (!error && user && user?.properties.action_link) {
      try {
        await mail(email, user?.properties.action_link);
        res.status(200).json({ message: 'Password recovery link sent!' });
      } catch (error) {
        res.status(400).json({ message: (error as Error).message });
      }
    } else {
      res.status(400).json({ message: error?.message });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function mail(email: string, action_link: string) {
  try {
    const data = {
      to: email,
      from: SENDGRID_CONFIG.from,
      subject: 'Test',
      html: `<a href=${action_link}>Recovery Link</a>`,
    };

    await send(data);
  } catch (error) {
    throw error;
  }
}
