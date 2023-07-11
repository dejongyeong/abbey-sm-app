import DshLayout from '@/components/dashboard/Layout';
import AssignForm from '@/components/machine/AssignForm';
import MachineForm from '@/components/machine/MachineForm';
import MachineTable from '@/components/machine/MachineTable';
import { checkUserSessionSsr } from '@/services/auth/check-session-ssr';
import { isRegisterable } from '@/services/machine/check-accessible';
import { getMachineBasedOnRole } from '@/services/machine/get-machines-based-on-role';
import { getDealerships } from '@/services/machine/query/get-dealerships-list';
import { getFarmManagers } from '@/services/machine/query/get-farm-manager-list';
import { getMachineType } from '@/services/machine/query/get-machine-type';
import {
  getUnassignMachineForAM,
  getUnassignMachineForDealer,
} from '@/services/machine/query/get-unassigned-machine-am-query';
import { getLoginUser } from '@/services/user/query/get-login-user';
import { Breadcrumb, Typography, message } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';

const { Title } = Typography;

export default function Machines({
  user,
  machines,
  machineType,
  dealerships,
  unassignAM,
  farmManagers,
  unassignDealer,
}: any) {
  const dealers = JSON.parse(dealerships);
  const farmManager = JSON.parse(farmManagers);
  const assets = JSON.parse(machines);
  const unassignedAM = JSON.parse(unassignAM);
  const unassignedDealer = JSON.parse(unassignDealer);

  const registerable = isRegisterable(user);
  const role = user.role.alias;

  return (
    <main className="w-full min-h-screen">
      <Breadcrumb items={[{ title: 'Home' }, { title: 'Machines' }]} />
      <div className="h-auto mt-7 p-5 bg-white ">
        <Title level={4}>Manage Machines</Title>
        <div className="flex flex-col justify-start gap-3 my-6">
          {registerable && (
            <MachineForm
              user={user}
              types={machineType}
              dealerships={dealers}
            />
          )}

          {role === 'dealership' ? (
            <AssignForm
              user={user}
              assignees={farmManager}
              machines={unassignedDealer}
            />
          ) : null}

          {role === 'am-admin' || role === 'am-manager' || 'am-prod-team' ? (
            <AssignForm
              user={user}
              assignees={dealers}
              machines={unassignedAM}
            />
          ) : null}

          <MachineTable machines={assets} user={user} />
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

  const user = await getLoginUser(session.user.id); // get current user'

  // get machine information for forms
  const machineType = await getMachineType();
  const dealerships = await getDealerships();
  const farmManagers = await getFarmManagers(user.sb_auth_id);

  // get machines based on user roles
  const machines = await getMachineBasedOnRole(user);

  const unassignAM = await getUnassignMachineForAM();
  const unassignDealer = await getUnassignMachineForDealer();

  return {
    props: {
      initialSession: session,
      user: user,
      machines: JSON.stringify(machines),
      machineType: machineType,
      dealerships: JSON.stringify(dealerships),
      unassignAM: JSON.stringify(unassignAM),
      farmManagers: JSON.stringify(farmManagers),
      unassignDealer: JSON.stringify(unassignDealer),
    },
  };
};
