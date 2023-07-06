import { displayMessage } from '@/utils/display-message';
import { createMachineSchema } from '@/validations/machines/create-machine-schema';
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
} from 'antd';
import { useState } from 'react';

const { Text } = Typography;

const yupSync = {
  async validator({ field }: any, value: any) {
    await createMachineSchema.validateSyncAt(field, { [field]: value });
  },
};

// TODO: edit create logic here

const MachineForm = ({ user, types, dealerships, messageApi }: any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const initialValues = { registrar: `${user?.first_name} ${user?.last_name}` };
  const registrarId = user?.sb_auth_id;

  const onFinish = (values: any) => {
    setLoading(true);
    const params = {
      model_no: values.model_no,
      type_id: values.type_id,
      prod_date: values.prod_date,
      registrar_id: registrarId,
    };

    try {
      alert(JSON.stringify(params));
      displayMessage(messageApi, 'success', 'Success');
      // form.resetFields();
    } catch (error) {
      displayMessage(messageApi, 'error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Text className="text-gray-600 font-semibold">Create Machines</Text>
      <div className="flex flex-col justify-start align-top mt-5 w-5/12 max-[1258px]:w-9/12 max-[1024px]:w-full">
        <Form
          form={form}
          name="add-machine"
          labelWrap
          labelAlign="left"
          labelCol={{ span: 7 }}
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Form.Item
            label="Serial No."
            name="serial_no"
            required
            rules={[yupSync]}
          >
            <Input placeholder="Serial Number" />
          </Form.Item>

          <Form.Item
            label="Model No."
            name="model_no"
            required
            rules={[yupSync]}
          >
            <Input placeholder="Model Number" />
          </Form.Item>

          <Form.Item label="Type" name="type_id" required rules={[yupSync]}>
            <Select
              placeholder="Machine Type"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.props?.children
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {types.map((type: any) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Production Date"
            name="prod_date"
            required
            rules={[yupSync]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="Registrar"
            name="registrar"
            required
            rules={[yupSync]}
          >
            <Input placeholder="Registrar" disabled />
          </Form.Item>

          <Form.Item
            label="Dealerships"
            name="dealership"
            required
            rules={[yupSync]}
          >
            <Select
              placeholder="Assign to"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.props?.children
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {dealerships?.map((dealership: any) => (
                <Select.Option
                  key={dealership.sb_auth_id}
                  value={dealership.sb_auth_id}
                >
                  {dealership.first_name} {dealership.last_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item className="flex align-middle justify-end">
            <div className="flex align-middle justify-end gap-2">
              <Button type="default" htmlType="reset">
                Clear
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
                className="w-full bg-custom-color hover:bg-hover-color"
              >
                {!loading ? 'Create' : 'Creating'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default MachineForm;

{
  /* <Form.Item
label="Farm Managers"
name="farm_manager"
required
rules={[yupSync]}
>
<Select
  placeholder="Assign to"
  showSearch
  optionFilterProp="children"
  filterOption={(input, option) =>
    option?.props?.children
      .toLowerCase()
      .includes(input.toLowerCase())
  }
>
  {farmManagers?.map((manager: any) => (
    <Select.Option
      key={manager.sb_auth_id}
      value={manager.sb_auth_id}
    >
      {manager.first_name} {manager.last_name}
    </Select.Option>
  ))}
</Select>
</Form.Item> */
}
