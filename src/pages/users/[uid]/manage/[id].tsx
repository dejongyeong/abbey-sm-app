import DshLayout from '@/components/dashboard/Layout';
import { checkUserSessionSsr } from '@/services/auth/check-session-ssr';
import { getSpecificUser } from '@/services/user/get-specific-user';
import { getLoginUser } from '@/services/user/query/get-login-user';
import { getSelectedUser } from '@/services/user/query/get-selected-user';
import { Breadcrumb, Typography } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

const { Title } = Typography;

const items = [{ title: 'Home' }, { title: 'Users' }, { title: 'Manage' }];

const Users = ({ selected }: any) => {
  const router = useRouter();

  const user = JSON.parse(selected);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full h-auto">
      <Breadcrumb items={items} />
      <div className="h-auto mt-7 p-5 bg-white">
        <Title level={4}>Manage Users</Title>
        <p>ID: {user?.first_name}</p>
        <p>TODO: design this page</p>
      </div>
    </main>
  );
};

export default Users;

Users.getLayout = function getLayout(page: ReactNode, pageProps: any) {
  return (
    <DshLayout pageProps={pageProps} pageTitle="Dashboard">
      {page}
    </DshLayout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await checkUserSessionSsr(ctx);
  if (!session) {
    return { redirect: { destination: '/auth/login', permanent: false } };
  }

  // get current user
  const user = await getLoginUser(session.user.id);

  // get info the selected user
  const { params } = ctx;
  const id = params?.id as string;
  const selected = await getSelectedUser(id);

  return {
    props: { user: user, selected: JSON.stringify(selected) },
  };
};
