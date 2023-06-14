import * as yup from 'yup';

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters in length')
    .required('Password must not be empty')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character (!@#$%^&*)'
    ),
});
