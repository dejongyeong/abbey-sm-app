import { BASE_URL, SENDGRID_CONFIG } from '@/config/constant';
import { prisma } from '@/lib/prisma/db';
import { getSupabaseServerAdminClient } from '@/lib/supabase/admin';
import { send } from '@/services/mail/send';
import { checkUserExist } from '@/services/user/check-user-exist';
import { createInvite } from '@/services/user/create-invite';
import { ICreateUserInput } from '@/types/user';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      await createUserAndSendInvitation(req, res);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function createUserAndSendInvitation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const inviteLink = await generateInviteLink(req, res); // get user id
    const receiverId = inviteLink?.user.id;
    const { senderId } = req.body;
    const user = await checkUserExist(receiverId); // check if user exist

    try {
      if (!user) {
        const profile = await createUser(req, inviteLink?.user.id); // receiver
        await createInvite(senderId, receiverId); // link sender and receiver
        await mail(profile.email, inviteLink.properties.action_link); // send email
        res.status(200).json({ message: 'Invitation link sent!' });
      } else {
        const confirm = user.invites_received[0];
        if (!confirm?.is_accepted) {
          await mail(user.email, inviteLink.properties.action_link); // re-send email
          res.status(200).json({ message: 'Invitation link re-sent!' });
        } else {
          res.status(200).json({ message: 'Invitation already accepted!' });
        }
      }
    } catch (error: any) {
      res.status(400).json({ message: (error as Error).message });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function generateInviteLink(req: NextApiRequest, res: NextApiResponse) {
  const supabaseServerAdminClient = getSupabaseServerAdminClient(req, res);

  const { email } = req.body;
  const { data: user, error } =
    await supabaseServerAdminClient.auth.admin.generateLink({
      type: 'invite',
      email: email,
      options: { redirectTo: `${BASE_URL}/account/confirm` },
    });

  if (error) {
    throw error;
  }

  return user;
}

async function createUser(req: NextApiRequest, sbAuthId: string) {
  const {
    email,
    first_name,
    last_name,
    dial_code,
    phone,
    company,
    role_id,
  }: ICreateUserInput = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        sb_auth_id: sbAuthId,
        email: email,
        first_name: first_name,
        last_name: last_name,
        dial_code: dial_code,
        phone: phone,
        company: company,
        role: { connect: { id: role_id } },
      },
    });

    return user;
  } catch (error: any) {
    throw new Error('Failed to create User.');
  }
}

async function mail(email: string, action_link: string) {
  try {
    const data = {
      to: email,
      from: SENDGRID_CONFIG.sendFrom,
      subject: 'Invitation Link',
      html: `<a href=${action_link}>Invitation Link</a>`,
    };

    await send(data);
  } catch (error) {
    throw error;
  }
}

// Create the invite
//   await prisma.invite.create({
//     data: {
//       sender_id: createdUser.id,
//       receiver_id: createdUser.id,
//       token: inviteToken,
//     },
//   });
