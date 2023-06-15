import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { SUPABASE_CONFIG } from '@/config/constant';

export function getSupabaseServerClient(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createPagesServerClient(
    { req, res },
    { supabaseUrl: SUPABASE_CONFIG.url, supabaseKey: SUPABASE_CONFIG.anonKey }
  );

  return supabaseServerClient;
}
