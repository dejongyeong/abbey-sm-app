import { prisma } from '@/lib/prisma/db';

export async function unassignDealershipMachine(mid: string) {
  const machine = await prisma.machine.update({
    where: { id: mid },
    data: { dealership: { disconnect: true } },
  });

  return machine;
}

export async function unassignFarmManagerMachine(mid: string) {
  const machine = await prisma.machine.update({
    where: { id: mid },
    data: { farm_manager: { disconnect: true } },
  });

  return machine;
}
