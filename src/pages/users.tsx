import DshLayout from '@/components/dashboard/Layout';
import RolesCount from '@/components/user/RolesCount';
import UserTable from '@/components/user/UserTable';
import InviteSection from '@/components/user/invite/InviteSection';
import { checkUserSessionSsr } from '@/services/auth/check-session-ssr';
import { filterRoleList } from '@/services/role/filter-role-list';
import { getAllRoles } from '@/services/role/get-all-roles';
import { getLoginUser } from '@/services/user/get-login-user';
import { IRole } from '@/types/role';
import { Breadcrumb, Typography } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';

const { Title } = Typography;

interface IProps {
  uid: string;
  roles: IRole;
}

export default function Users({ uid, roles }: IProps) {
  const senderId = uid;

  return (
    <main className="w-full h-auto">
      <Breadcrumb items={[{ title: 'Home' }, { title: 'Users' }]} />
      <div className="h-auto mt-7 p-5 bg-white ">
        <Title level={4}>Manage Users</Title>
        <div className="mt-6">
          <InviteSection senderId={senderId} roles={roles} />
        </div>
        <div className="grid grid-cols-5 mt-9 max-[1024px]:grid-cols-1 max-[1024px]:gap-0 min-[1024.1px]:gap-10">
          <RolesCount />
          <UserTable />
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

  return {
    props: {
      initialSession: session,
      uid: session?.user.id,
      roles: roles,
      user: user,
    },
  };
};

const roleOptions = async (user: any) => {
  try {
    const roles = await getAllRoles();
    const filtered = await filterRoleList(user, roles);
    return filtered;
  } catch (error) {
    throw error;
  }
};
