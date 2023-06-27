import { getSupabaseServerClient } from '@/lib/supabase/api-server';
import { NextApiRequest, NextApiResponse } from 'next';

export async function checkUserSessionApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const supabase = getSupabaseServerClient(req, res);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session;
  } catch (error) {
    throw error;
  }
}
