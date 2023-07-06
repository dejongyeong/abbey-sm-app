import DshLayout from '@/components/dashboard/Layout';
import MachineForm from '@/components/machine/MachineForm';
import MachineTable from '@/components/machine/MachineTable';
import { checkUserSessionSsr } from '@/services/auth/check-session-ssr';
import { isRegisterable } from '@/services/machine/check-accessible';
import { getAllMachines } from '@/services/machine/query/get-all-machines';
import { getDealerships } from '@/services/machine/query/get-dealerships-list';
import { getFarmManagers } from '@/services/machine/query/get-farm-manager-list';
import { getMachineType } from '@/services/machine/query/get-machine-type';
import { getLoginUser } from '@/services/user/query/get-login-user';
import { Breadcrumb, Typography, message } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';

const { Title } = Typography;

// TODO: show machines that are belonging to the person

export default function Machines({
  user,
  machines,
  machineType,
  dealerships,
  farmManagers,
}: any) {
  const dealers = JSON.parse(dealerships);
  const assets = JSON.parse(machines);

  const registerable = isRegisterable(user);

  return (
    <main className="w-full h-auto">
      <Breadcrumb items={[{ title: 'Home' }, { title: 'Machines' }]} />
      <div className="h-auto mt-7 p-5 bg-white ">
        <Title level={4}>Manage Machines</Title>
        <div className="flex flex-col justify-start gap-4 my-6">
          {registerable && (
            <MachineForm
              user={user}
              types={machineType}
              dealerships={dealers}
            />
          )}
          <MachineTable machines={assets} />
        </div>
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

  const machines = await getAllMachines(); // get all machines
  const machineType = await getMachineType();
  const dealerships = await getDealerships();
  const farmManagers = await getFarmManagers();

  return {
    props: {
      initialSession: session,
      user: user,
      machines: JSON.stringify(machines),
      machineType: machineType,
      dealerships: JSON.stringify(dealerships),
      farmManagers: farmManagers,
    },
  };
};
