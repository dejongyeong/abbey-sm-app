import sgMail from '@sendgrid/mail';
import { SENDGRID_CONFIG } from '@/config/constant';

interface ISend {
  to: string;
  from: string;
  subject: string;
  html: string;
}

sgMail.setApiKey(SENDGRID_CONFIG.apiKey ?? '');

export const send = async ({ to, from, subject, html }: ISend) => {
  try {
    const message = { to, from, subject, html };
    await sgMail.send(message);
  } catch (error) {
    throw new Error('Error sending email');
  }
};
