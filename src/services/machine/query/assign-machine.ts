import { prisma } from '@/lib/prisma/db';

export async function assignDealershipMachine(mid: string, dealerId: string) {
  const machine = await prisma.machine.update({
    where: { id: mid },
    data: { dealership: { connect: { sb_auth_id: dealerId } } },
  });

  return machine;
}

export async function assignFarmManagerMachine(mid: string, fmId: string) {
  const machine = await prisma.machine.update({
    where: { id: mid },
    data: { farm_manager: { connect: { sb_auth_id: fmId } } },
  });

  return machine;
}
