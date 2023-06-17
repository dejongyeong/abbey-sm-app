import { prisma } from '@/lib/prisma/db';

export async function createInvite(senderUid: string, receiverUid: string) {
  try {
    await prisma.invite.create({
      data: {
        sender_id: senderUid,
        receiver_id: receiverUid,
      },
    });
  } catch (error) {
    throw error;
  }
}
