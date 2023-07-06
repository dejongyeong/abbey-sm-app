import { prisma } from '@/lib/prisma/db';

export async function getDealerships() {
  const users = await prisma.user.findMany({
    where: { role: { alias: 'dealership' } },
  });

  return users;
}
