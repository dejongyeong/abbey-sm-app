import { GetServerSidePropsContext } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { SUPABASE_CONFIG } from '@/config/constant';

export function getSupabaseSsrServerClient(ctx: GetServerSidePropsContext) {
  const supabaseSsrServerClient = createPagesServerClient(ctx, {
    supabaseUrl: SUPABASE_CONFIG.url,
    supabaseKey: SUPABASE_CONFIG.anonKey,
  });

  return supabaseSsrServerClient;
}
