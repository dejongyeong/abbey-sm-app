import DshLayout from '@/components/dashboard/Layout';
import { getSupabaseSsrServerClient } from '@/lib/supabase/ssr-server';
import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';

export default function Users({ uid }: { uid: string }) {
  const senderId = uid;

  return (
    <main className="w-full h-screen p-8">
      <p>Sender Id: {senderId}</p>
    </main>
  );
}

Users.getLayout = function getLayout(page: ReactNode, pageProps: any) {
  return (
    <DshLayout pageProps={pageProps} pageTitle="Users">
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
