import DshLayout from '@/components/dashboard/Layout';
import VacuumSpeed from '@/components/sensors/vacuum-speed/VacuumSpeed';
import VacuumTemp from '@/components/sensors/vacuum-temperature/VacuumTemp';
import { checkUserSessionSsr } from '@/services/auth/check-session-ssr';
import { getLoginUser } from '@/services/user/get-login-user';
import { Breadcrumb } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';

export default function Home() {
  return (
    <main className="w-full h-auto">
      <Breadcrumb items={[{ title: 'Home' }, { title: 'Dashboard' }]} />
      <div className="h-auto mt-7 p-5 bg-white">
        <div className="grid grid-cols-3 max-[1440px]:grid-cols-2 max-[768px]:grid-cols-1 gap-4">
          <VacuumSpeed />
          <VacuumTemp />
        </div>
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
