import { displayMessage } from '@/utils/display-message';
import { createMachineSchema } from '@/validations/machines/create-machine-schema';
import { Button, DatePicker, Form, Input, Select, Typography } from 'antd';
import { useState } from 'react';

const { Text } = Typography;

interface IMachineForm {
  messageApi: any;
  types: any;
  user: any;
  dealerships: any;
  farmManagers: any;
}

const yupSync = {
  async validator({ field }: any, value: any) {
    await createMachineSchema.validateSyncAt(field, { [field]: value });
  },
};

const CreateMachineForm = ({
  messageApi,
  types,
  user,
  dealerships,
  farmManagers,
}: IMachineForm) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const initialValues = { registrar: `${user?.first_name} ${user?.last_name}` };

  // TODO: assign machines
  const onFinish = (values: any) => {
    setLoading(true);

    const params = {
      serial_no: values.serial_no,
      model_no: values.model_no,
      type_id: values.type_id,
      prod_date: values.prod_date,
      registrar_id: user?.sb_auth_id,
      dealership_id: values.dealership,
      farm_manager_id: values.farm_manager,
    };

    try {
      // TODO: edit logic here
      alert(JSON.stringify(params));
      displayMessage(messageApi, 'success', 'Success');
      form.resetFields();
    } catch (error) {
      displayMessage(messageApi, 'error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Text className="text-gray-600 font-semibold">Create Machines</Text>
      <div className="flex flex-col mt-5 min-[426px]:h-max w-1/3 max-[1024px]:w-9/12 max-[632.01px]:w-full">
        <Form
          form={form}
          name="add-machine"
          labelWrap
          labelAlign="left"
          labelCol={{ span: 6 }}
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

          <Form.Item
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
    </div>
  );
};

export default CreateMachineForm;
