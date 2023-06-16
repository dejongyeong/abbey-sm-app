import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SUPABASE_CONFIG } from '../../config/constant';

export function getSupabaseMiddlewareClient(
  req: NextRequest,
  res: NextResponse
) {
  const supabaseMiddlewareClient = createMiddlewareClient(
    { req, res },
    {
      supabaseUrl: SUPABASE_CONFIG.url,
      supabaseKey: SUPABASE_CONFIG.serviceKey,
    }
  );

  return supabaseMiddlewareClient;
}
