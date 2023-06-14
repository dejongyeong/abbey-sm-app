import * as yup from 'yup';

import { passwordSchema } from './shared/password-schema';
import { emailSchema } from './shared/email-schema';

export const loginSchema = yup.object().shape({
  ...emailSchema.fields,
  ...passwordSchema.fields,
  remember: yup.boolean().default(false),
});
