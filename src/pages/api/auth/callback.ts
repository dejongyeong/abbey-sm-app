import { NextApiHandler } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseServerClient } from '@/lib/supabase/api-server';

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { code } = req.query;

  if (code) {
    const supabase = getSupabaseServerClient(req, res);
    await supabase.auth.exchangeCodeForSession(String(code));
  }

  // TODO: might need to come back for this, redirect to login
  res.redirect('/');
};

export default handler;
