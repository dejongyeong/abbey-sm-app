import DshLayout from '@/components/dashboard/Layout';
import UserTable from '@/components/user/UserTable';
import InviteSection from '@/components/user/invite/InviteSection';
import { getSupabaseSsrServerClient } from '@/lib/supabase/ssr-server';
import { getAllRoles } from '@/services/role/get-all-roles';
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

  // TODO: filter roles based on role
  const roles = await getAllRoles();

  return {
    props: {
      initialSession: session,
      uid: session.user.id,
      roles: roles,
    },
  };
};
