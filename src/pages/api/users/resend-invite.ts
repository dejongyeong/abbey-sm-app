import { NextApiRequest, NextApiResponse } from 'next';
import { generateInviteLink, mail } from './invite';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      await resendInvite(req, res);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function resendInvite(req: NextApiRequest, res: NextApiResponse) {
  try {
    const inviteLink = await generateInviteLink(req, res); // get user email

    const { email } = req.body;
    await mail(email, inviteLink.properties.action_link);

    res.status(200).json({ message: 'Invitation link re-sent!' });
  } catch (error) {
    throw error;
  }
}
