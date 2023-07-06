import { prisma } from '@/lib/prisma/db';

export default async function createMachine(data: any) {
  const {
    serial_no,
    model_no,
    prod_date,
    type_id,
    registrar_id,
    dealership_id,
  } = data;

  const machine = await prisma.machine.create({
    data: {
      serial_no: serial_no,
      model_no: model_no,
      prod_date: prod_date,
      type: { connect: { id: type_id } },
      registrar: { connect: { sb_auth_id: registrar_id } },
      dealership: { connect: { sb_auth_id: dealership_id } },
    },
  });

  return machine;
}
