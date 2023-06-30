import HistoricalData from '@/components/dashboard/HistoricalData';
import DshLayout from '@/components/dashboard/Layout';
import { checkUserSessionSsr } from '@/services/auth/check-session-ssr';
import { getLoginUser } from '@/services/user/query/get-login-user';
import { Breadcrumb } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';

// TODO: list should populate from database

export default function Home() {
  return (
    <main className="w-full h-auto">
      <Breadcrumb items={[{ title: 'Home' }, { title: 'Dashboard' }]} />
      <div className="h-auto mt-7 p-7 bg-white">
        <HistoricalData />
      </div>
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
  const session = await checkUserSessionSsr(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  // get current user
  const user = await getLoginUser(session.user.id);

  return {
    props: {
      initialSession: session,
      uid: session.user.id,
      user: user,
    },
  };
};
