import { prisma } from '@/lib/prisma/db';

// TODO: get farm manager invited by the dealer

export async function getFarmManagers(uid: string) {
  const users = await prisma.user.findMany({
    where: {
      role: { alias: 'farm-manager' },
      invites_received: { some: { sender_id: uid } },
    },
  });

  return users;
}
