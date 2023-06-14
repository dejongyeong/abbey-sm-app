import * as yup from 'yup';

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Invalid email address'),
});
