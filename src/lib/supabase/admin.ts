import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { SUPABASE_CONFIG } from '@/config/constant';

export function getSupabaseServerAdminClient(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServerClient = createPagesServerClient(
    { req, res },
    {
      supabaseUrl: SUPABASE_CONFIG.url,
      supabaseKey: SUPABASE_CONFIG.serviceKey,
    }
  );

  return supabaseServerClient;
}
