import * as yup from 'yup';

export const assignMachineSchema = yup.object().shape({
  mid: yup.string().required('Machine serial number must not be empty'),
  uid: yup.string().required('Assignee must not be empty'),
});
