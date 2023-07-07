import { prisma } from '@/lib/prisma/db';

export async function getMachinesForFarmManager(uid: string) {
  const machines = await prisma.machine.findMany({
    where: { farm_manager_id: uid },
    select: {
      id: true,
      serial_no: true,
      model_no: true,
      type: true,
      type_id: true,
      dealership: true,
      dealership_id: true,
    },
  });

  return machines;
}
