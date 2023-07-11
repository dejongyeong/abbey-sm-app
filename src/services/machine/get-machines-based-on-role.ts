import { getAllMachines } from './query/get-all-machines';
import { getMachinesForFarmManager } from './query/get-machines-farm-managers';
import { getMachinesForDealers } from './query/get-machines-for-dealers';
import { getMachinesForFarmer } from './query/get-machines-for-farmer';

export const getMachineBasedOnRole = async (user: any) => {
  let machines = [];
  switch (user?.role?.alias) {
    case 'dealership':
      // get all machines belonging to the dealerships only
      machines = await getMachinesForDealers(user.sb_auth_id);
      break;
    case 'farm-manager':
      // get all machines belonging to the farm manager only
      machines = await getMachinesForFarmManager(user.sb_auth_id);
      break;
    case 'farmer':
      // get all machines belonging to their farm manager only
      machines = await getMachinesForFarmer(user.invites_received[0].sender_id);
      break;
    default:
      // get all machines for am-admin, am-manager, am-prod, and am-service
      machines = await getAllMachines();
      break;
  }

  return machines;
};
