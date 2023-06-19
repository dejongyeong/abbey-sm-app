import DshLayout from '@/components/dashboard/Layout';
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

export default function Users({ uid, roles }: { uid: string; roles: IRole }) {
  const senderId = uid;

  return (
    <main className="w-full h-auto">
      <Breadcrumb items={[{ title: 'Home' }, { title: 'Users' }]} />
      <div className="h-auto mt-7 p-5 bg-white ">
        <Title level={4}>Manage Users</Title>
        <div className="mt-6">
          <InviteSection senderId={senderId} roles={roles} />
        </div>
        <div className="mt-8 overflow-x-auto">
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
  try {
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
  } catch (error: any) {
    return {
      notFound: true,
    };
  }
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
