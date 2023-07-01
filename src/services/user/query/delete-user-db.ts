import { prisma } from '@/lib/prisma/db';

export async function deleteUserInDatabase(userSpAuthId: string) {
  try {
    await prisma.$transaction([
      prisma.invite.deleteMany({
        where: {
          OR: [{ sender_id: userSpAuthId }, { receiver_id: userSpAuthId }],
        },
      }),
      prisma.user.delete({ where: { sb_auth_id: userSpAuthId } }),
    ]);
  } catch (error) {
    throw error;
  }
}
