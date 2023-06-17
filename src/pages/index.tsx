import Logout from '@/components/auth/Logout';
import DshLayout from '@/components/dashboard/Layout';
import { getSupabaseSsrServerClient } from '@/lib/supabase/ssr-server';
import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';

export default function Home() {
  return (
    <main className="w-full h-screen">
      <h1>Dashboard</h1>
      <Logout />
    </main>
  );
}

Home.getLayout = function getLayout(page: ReactNode, pageProps: any) {
  return (
    <DshLayout pageProps={pageProps} pageTitle="Dashboard">
      {page}
    </DshLayout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabaseSsrServerClient = getSupabaseSsrServerClient(ctx);

  // check session
  const {
    data: { session },
  } = await supabaseSsrServerClient.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialSession: session,
      uid: session.user.id,
    },
  };
};
