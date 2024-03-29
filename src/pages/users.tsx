import DshLayout from '@/components/dashboard/Layout';
import RolesCount from '@/components/user/RolesCount';
import UserTable from '@/components/user/UserTable';
import InviteSection from '@/components/user/invite/InviteSection';
import { checkUserSessionSsr } from '@/services/auth/check-session-ssr';
import { roleOptions } from '@/services/user/get-role-options';
import { getUserList } from '@/services/user/get-user-list';
import { userRoleCounts } from '@/services/user/get-user-role-counts';
import { getLoginUser } from '@/services/user/query/get-login-user';
import { IRole } from '@/types/role';
import { Breadcrumb, Divider, Empty, Tooltip, Typography } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';

const { Title, Text } = Typography;

interface IProps {
  uid: string;
  roles: IRole;
  counts: any;
  userList: any;
}

export default function Users({ uid, roles, counts, userList }: IProps) {
  const senderId = uid;
  const users = JSON.parse(userList);

  return (
    <main className="w-full min-h-screen">
      <Breadcrumb items={[{ title: 'Home' }, { title: 'Users' }]} />
      <div className="h-auto mt-7 p-5 bg-white">
        <Title level={4}>Manage Users</Title>
        <div className="mt-6">
          <InviteSection senderId={senderId} roles={roles} />
        </div>
        <div className="mt-10 mb-6 flex flex-col">
          <div className="order-1 mb-4">
            <div className="mb-4">
              <Tooltip title="Reload page to see the latest list.">
                <Text className="font-semibold">User List:</Text>
              </Tooltip>
            </div>
            <UserTable uid={uid} users={users} />
          </div>

          <Divider className="order-2" />

          <div className="order-3 mt-5 mb-6">
            <div className="mb-4">
              <Text className="font-semibold mb-6">Total Users:</Text>
            </div>
            {counts && counts.length > 0 ? (
              <RolesCount counts={counts} />
            ) : (
              <Empty description="No Users" />
            )}
          </div>
        </div>
      </div>
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

  // get role option based on user role
  const roles = await roleOptions(user);

  // count users by roles
  const counts = await userRoleCounts(user);

  // get all users
  const userList = await getUserList(session.user.id, user.role.alias);

  return {
    props: {
      initialSession: session,
      uid: session?.user.id,
      roles: roles,
      user: user,
      counts: counts,
      userList: JSON.stringify(userList),
    },
  };
};
