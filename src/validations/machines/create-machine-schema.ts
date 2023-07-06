import * as yup from 'yup';

export const createMachineSchema = yup.object().shape({
  serial_no: yup.string().required('Machine serial number must not be empty'),
  model_no: yup.string().required('Machine model number must not be empty'),
  type_id: yup.string().required('Machine type must not be empty'),
  prod_date: yup.date().required('Production date must not be empty'),
  registrar: yup.string().required('Registrar must not be empty'),
  dealership: yup
    .string()
    .required(
      'Dealership must not be empty. Invite dealership first if list is empty'
    ),
  farm_manager: yup.string().notRequired(),
});
