import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSupabaseMiddlewareClient } from './lib/supabase/protected';
import { checkUserConfirmation } from './services/auth/check-user-confirmation';
import { SUPER_ADMIN } from './config/constant';

export async function middleware(req: NextRequest) {
  try {
    // We need to create a response and hand it to the supabase client to be able to modify the response headers.
    const res = NextResponse.next();

    // Create authenticated Supabase Client.
    const supabase = getSupabaseMiddlewareClient(req, res);

    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Check auth condition
    if (session) {
      const confirm = await checkUserConfirmation(session?.user.id);
      // super admin has no invitation
      if (confirm || session.user?.email === SUPER_ADMIN.email) {
        return res; // Authentication successful, forward request to protected route.
      }
    }

    // Auth condition not met, redirect to home page and throw error
    throw new Error('Authentication failed. Please login.');
  } catch (error) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/auth/login';
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    redirectUrl.searchParams.set('error', (error as Error).message);
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: ['/', '/users', '/analytics'],
};
