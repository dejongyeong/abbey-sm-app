import DshLayout from '@/components/dashboard/Layout';
import RolesCount from '@/components/user/RolesCount';
import UserTable from '@/components/user/UserTable';
import InviteSection from '@/components/user/invite/InviteSection';
import { checkUserSessionSsr } from '@/services/auth/check-session-ssr';
import { countUsersByRole } from '@/services/role/count-users-by-role';
import { filterRoleList } from '@/services/role/filter-role-list';
import { getAllRoles } from '@/services/role/get-all-roles';
import { roleOptions } from '@/services/user/get-role-options';
import { getUserList } from '@/services/user/get-user-list';
import { userRoleCounts } from '@/services/user/get-user-role-counts';
import { getAllUsers } from '@/services/user/query/get-all-users';
import { getLoginUser } from '@/services/user/query/get-login-user';
import { IRole } from '@/types/role';
import { Breadcrumb, Typography } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';

const { Title } = Typography;

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
    <main className="w-full h-auto">
      <Breadcrumb items={[{ title: 'Home' }, { title: 'Users' }]} />
      <div className="h-auto mt-7 p-5 bg-white ">
        <Title level={4}>Manage Users</Title>
        <div className="mt-6">
          <InviteSection senderId={senderId} roles={roles} />
        </div>
        <div className="mt-10 flex flex-col lg:gap-10 lg:flex-row">
          {counts && counts.length > 0 ? <RolesCount counts={counts} /> : null}
          <UserTable users={users} />
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
