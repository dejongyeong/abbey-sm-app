import { SENDGRID_CONFIG } from '@/config/constant';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';

sgMail.setApiKey(SENDGRID_CONFIG.apiKey ?? '');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      await send(req, res);
    } else {
      res.status(404).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function send(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabaseServerClient = getSupabaseServerClient(req, res);

    const {
      data: { session },
    } = await supabaseServerClient.auth.getSession();

    if (!session) res.status(401).json({ message: 'Not authenticated' });

    // TODO: check user role

    const { to, from, subject, html } = req.body;
    const message = { to, from, subject, html };

    try {
      await sgMail.send(message);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error sending email' });
    }
  } catch (error) {
    res.status(405).json({ message: (error as Error).message });
  }
}
