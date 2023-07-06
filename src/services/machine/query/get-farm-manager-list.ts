import { prisma } from '@/lib/prisma/db';

export async function getFarmManagers() {
  const users = await prisma.user.findMany({
    where: { role: { alias: 'farm-manager' } },
  });

  return users;
}
