import * as yup from 'yup';

export const selectionSchema = yup.object().shape({
  serial: yup.string().required('Please select a machine serial number.'),
  range_picker: yup
    .array()
    .of(yup.date().required('Date is required'))
    .required('Date range is required'),
});
