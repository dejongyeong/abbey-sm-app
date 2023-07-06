import DshLayout from '@/components/dashboard/Layout';
import CreateMachineForm from '@/components/machine/CreateMachineForm';
import { checkUserSessionSsr } from '@/services/auth/check-session-ssr';
import { isAccessible } from '@/services/machine/check-form-accessible';
import { getDealerships } from '@/services/machine/query/get-dealerships-list';
import { getFarmManagers } from '@/services/machine/query/get-farm-manager-list';
import { getMachineType } from '@/services/machine/query/get-machine-type';
import { getLoginUser } from '@/services/user/query/get-login-user';
import { Breadcrumb, Typography, message } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';

const { Title } = Typography;

interface IMachines {
  machineType: any;
  user: any;
  dealerships: any;
  farmManagers: any;
}

export default function Machines({
  machineType,
  user,
  dealerships,
  farmManagers,
}: IMachines) {
  const [messageApi, contextHolder] = message.useMessage();

  const accessible = isAccessible(user);

  // TODO: show machines that are belonging to the person

  return (
    <main className="w-full h-auto">
      {contextHolder}
      <Breadcrumb items={[{ title: 'Home' }, { title: 'Machines' }]} />
      <div className="h-auto mt-7 p-5 bg-white ">
        <Title level={4}>Manage Machines</Title>
        <div className="flex flex-col justify-start gap-4 my-6">
          {accessible ? (
            <CreateMachineForm
              messageApi={messageApi}
              types={machineType}
              user={user}
              dealerships={dealerships}
              farmManagers={farmManagers}
            />
          ) : null}

          <div>machine list</div>
        </div>

        <div>assign machine</div>
      </div>
    </main>
  );
}

Machines.getLayout = function getLayout(page: ReactNode, pageProps: any) {
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

  const machineType = await getMachineType();
  const dealerships = await getDealerships();
  const farmManagers = await getFarmManagers();

  return {
    props: {
      initialSession: session,
      user: user,
      machineType: machineType,
      dealerships: dealerships,
      farmManagers: farmManagers,
    },
  };
};
