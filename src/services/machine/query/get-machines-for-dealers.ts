import { prisma } from '@/lib/prisma/db';

export async function getMachinesForDealers(uid: string) {
  const machines = await prisma.machine.findMany({
    where: { dealership_id: uid },
    select: {
      id: true,
      serial_no: true,
      model_no: true,
      prod_date: true,
      type: true,
      type_id: true,
      registrar: true,
      registrar_id: true,
      farm_manager: true,
      farm_manager_id: true,
      created_at: true,
    },
  });

  return machines;
}
