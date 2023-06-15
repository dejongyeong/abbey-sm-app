import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import ErrorBoundaryWrapper from '@/components/error/ErrorBoundaryWrapper';
import { SUPABASE_CONFIG } from '@/config/constant';
import Toast from '@/components/shared/Toast';

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient({
      supabaseUrl: SUPABASE_CONFIG.url,
      supabaseKey: SUPABASE_CONFIG.anonKey,
    })
  );

  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>

      <ErrorBoundaryWrapper>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <Component {...pageProps} />
          <Toast />
        </SessionContextProvider>
      </ErrorBoundaryWrapper>
    </div>
  );
}

// References: https://supabase.com/docs/guides/auth/auth-helpers/nextjs-pages#code-exchange-api-route
// References: https://github.com/Ducksss/HackLah2023-AquaWise/blob/1285f9ef05542b7ed6a6c6a3111d4dd78633b283/web-app/pages/_app.jsx
