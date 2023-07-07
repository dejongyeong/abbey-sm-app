import { prisma } from '@/lib/prisma/db';

export async function getMachinesForFarmer(inviterId: string) {
  const machines = await prisma.machine.findMany({
    where: { farm_manager_id: inviterId },
    select: {
      id: true,
      serial_no: true,
      model_no: true,
      type: true,
      type_id: true,
      farm_manager: true,
      farm_manager_id: true,
    },
  });

  return machines;
}
