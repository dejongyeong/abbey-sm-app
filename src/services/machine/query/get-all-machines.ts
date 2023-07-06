import { prisma } from '@/lib/prisma/db';

export async function getAllMachines() {
  const machines = await prisma.machine.findMany({
    include: {
      type: true,
      registrar: true,
      dealership: true,
      farm_manager: true,
    },
  });

  return machines;
}
