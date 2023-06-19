import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { SUPABASE_CONFIG } from '@/config/constant';
import Toast from '@/components/shared/Toast';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, pageProps?: P) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient({
      supabaseUrl: SUPABASE_CONFIG.url,
      supabaseKey: SUPABASE_CONFIG.anonKey,
    })
  );

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  // handle flash of unstyled content
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`${!mounted ? 'invisible' : 'visible'}`}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>

      {getLayout(
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <Component {...pageProps} />
          <Toast />
        </SessionContextProvider>,
        pageProps
      )}
    </div>
  );
}

// References: https://supabase.com/docs/guides/auth/auth-helpers/nextjs-pages#code-exchange-api-route
// References: https://github.com/Ducksss/HackLah2023-AquaWise/blob/1285f9ef05542b7ed6a6c6a3111d4dd78633b283/web-app/pages/_app.jsx
