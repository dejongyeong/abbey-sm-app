import { getSupabaseSsrServerClient } from '@/lib/supabase/ssr-server';
import { GetServerSidePropsContext } from 'next';

export async function checkUserSessionSsr(ctx: GetServerSidePropsContext) {
  try {
    const supabaseSsrServerClient = getSupabaseSsrServerClient(ctx);

    // check session
    const {
      data: { session },
    } = await supabaseSsrServerClient.auth.getSession();

    return session;
  } catch (error) {
    throw error;
  }
}
