import DshLayout from '@/components/dashboard/Layout';
import UpdateForm from '@/components/user/manage/UpdateForm';
import { checkUserSessionSsr } from '@/services/auth/check-session-ssr';
import { roleOptions } from '@/services/user/get-role-options';
import { getLoginUser } from '@/services/user/query/get-login-user';
import { getSelectedUser } from '@/services/user/query/get-selected-user';
import { Breadcrumb, Divider, Typography } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

const { Title, Text } = Typography;

const items = [{ title: 'Home' }, { title: 'Users' }, { title: 'Manage' }];

const Users = ({ selected, roles }: any) => {
  const router = useRouter();

  const user = JSON.parse(selected);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full h-auto">
      <Breadcrumb items={items} />
      <div className="h-auto mt-7 p-5 bg-white mb-9">
        <Title level={4}>Manage Users</Title>
        <div className="grid grid-cols-1 min-[1024.1px]:grid-cols-3 gap-16 mt-7">
          <div className="md:col-span-1">
            <Text>User Information:</Text>
            <UpdateForm user={user} roles={roles} />
          </div>
          <div className="col-span-1 min-[1024.1px]:col-span-2 min-[1024.1px]:ml-3">
            <Text>List of machines associated to this user</Text>
          </div>
        </div>
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

  // get role option based on user role
  const roles = await roleOptions(user);

  return {
    props: { user: user, selected: JSON.stringify(selected), roles: roles },
  };
};
