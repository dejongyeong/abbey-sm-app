import dayjs from 'dayjs';
import SensorData from '@/components/sensors/historical-data/SensorData';
import { getDefaultStartEndDate } from '@/utils/get-default-start-end-date';
import { selectionSchema } from '@/validations/sensors/selection-schema';
import { Button, DatePicker, Form, Select } from 'antd';

const { RangePicker } = DatePicker;

const yupSync = {
  async validator({ field }: any, value: any) {
    await selectionSchema.validateSyncAt(field, { [field]: value });
  },
};
const DataSection = () => {
  const [form] = Form.useForm();
  const { defaultStartDate, defaultEndDate } = getDefaultStartEndDate();

  // TODO: add logic
  const onFinish = async (value: any) => {
    console.log(value);
    alert('This function is in progress');
  };

  const initialValues = {
    range_picker: [dayjs(defaultStartDate), dayjs(defaultEndDate)],
  };

  return (
    <>
      <div className="flex justify-between align-middle gap-3 mb-3">
        <Form
          form={form}
          name="historical"
          layout="horizontal"
          labelWrap
          labelAlign="left"
          labelCol={{ span: 7 }}
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Form.Item name="serial" label="Machines:" required rules={[yupSync]}>
            <Select placeholder="Machine Serial Number">
              <Select.Option value="T100">T100</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="range_picker"
            label="Date Range:"
            required
            rules={[yupSync]}
          >
            <RangePicker className="w-full" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-custom-color hover:bg-hover-color"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      <SensorData />
    </>
  );
};

export default DataSection;
