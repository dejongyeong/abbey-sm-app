// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseServerClient } from '@/lib/supabase/api-server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      await login(req, res);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabaseServerClient = getSupabaseServerClient(req, res);

    const { email, password } = req.body;
    const { error } = await supabaseServerClient.auth.signInWithPassword({
      email,
      password,
    });

    error
      ? res.status(400).json({ message: error.message })
      : res.status(200).json({ message: 'Login Successful' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
