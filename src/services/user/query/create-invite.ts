import { prisma } from '@/lib/prisma/db';

export async function createInvite(senderUid: string, receiverUid: string) {
  try {
    await prisma.invite.create({
      data: {
        sender: { connect: { sb_auth_id: senderUid } },
        receiver: { connect: { sb_auth_id: receiverUid } },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
