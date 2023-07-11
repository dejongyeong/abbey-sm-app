import { prisma } from '@/lib/prisma/db';

export async function getUnassignMachineForAM() {
  const machines = await prisma.machine.findMany({
    where: {
      dealership: { is: null },
    },
  });

  return machines;
}

export async function getUnassignMachineForDealer() {
  const machines = await prisma.machine.findMany({
    where: {
      farm_manager: { is: null },
    },
  });

  return machines;
}
