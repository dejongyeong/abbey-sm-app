import { prisma } from '@/lib/prisma/db';

export async function getMachinesForDealers(uid: string) {
  const machines = await prisma.machine.findMany({
    where: { dealership_id: uid },
  });

  return machines;
}
