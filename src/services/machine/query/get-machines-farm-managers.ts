import { prisma } from '@/lib/prisma/db';

export async function getMachinesForFarmManager(uid: string) {
  const machines = await prisma.machine.findMany({
    where: { farm_manager_id: uid },
  });

  return machines;
}
