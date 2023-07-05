import { prisma } from '@/lib/prisma/db';

export async function getMachineType() {
  const machineType = await prisma.machineType.findMany({
    select: {
      id: true,
      name: true,
      alias: true,
    },
  });

  return machineType;
}
