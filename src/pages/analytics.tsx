import HistoricalData from '@/components/dashboard/HistoricalData';
import DshLayout from '@/components/dashboard/Layout';
import { checkUserSessionSsr } from '@/services/auth/check-session-ssr';
import { getLoginUser } from '@/services/user/query/get-login-user';
import { Breadcrumb, Typography } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';

const { Title } = Typography;

export default function Analytics({ user }: { user: any }) {
  // TODO: show machines that are belonging to the person

  return (
    <main className="w-full h-auto">
      <Breadcrumb items={[{ title: 'Home' }, { title: 'Analytics' }]} />
      <div className="h-auto mt-7 p-7 bg-white ">
        <div className="mb-8">
          <Title level={4}>Historical Data</Title>
        </div>
        <HistoricalData />
      </div>
    </main>
  );
}

Analytics.getLayout = function getLayout(page: ReactNode, pageProps: any) {
  return (
    <DshLayout pageProps={pageProps} pageTitle="Analytics">
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

  const user = await getLoginUser(session.user.id); // get current user
  return {
    props: {
      initialSession: session,
      user: user,
    },
  };
};
