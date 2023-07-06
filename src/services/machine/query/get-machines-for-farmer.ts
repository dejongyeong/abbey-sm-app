import { prisma } from '@/lib/prisma/db';

export async function getMachinesForFarmer(inviterId: string) {
  const machines = await prisma.machine.findMany({
    where: { farm_manager_id: inviterId },
  });

  return machines;
}
