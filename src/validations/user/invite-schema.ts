import * as yup from 'yup';
import { emailSchema } from '../auth/shared/email-schema';

export const inviteSchema = yup.object().shape({
  ...emailSchema.fields,
  first_name: yup.string().required('First name must not be empty'),
  last_name: yup.string().required('Last name must not be empty'),
  phone: yup
    .string()
    .required('Phone number must not be empty')
    .matches(
      /^([0-9]{9,10})$/,
      'Phone number must be in the format of 83xxxxxxx or 083xxxxxxx'
    ),
  company_name: yup.string().notRequired(),
  address: yup.string().notRequired(),
  city: yup.string().notRequired(),
  country: yup.string().notRequired(),
  zip: yup.string().notRequired(),
  role_id: yup.string().required('User Role must not be empty'),
});
