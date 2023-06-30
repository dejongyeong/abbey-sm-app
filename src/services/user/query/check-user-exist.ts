import { prisma } from '@/lib/prisma/db';

export async function checkUserExist(sbAuthId: string) {
  const user = await prisma.user.findUnique({
    where: { sb_auth_id: sbAuthId },
    include: {
      invites_received: {
        select: { is_accepted: true },
      },
    },
  });

  return user;
}
