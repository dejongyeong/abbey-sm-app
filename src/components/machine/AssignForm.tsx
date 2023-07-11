import { assignMachine } from '@/services/machine/assign-machine';
import { displayMessage } from '@/utils/display-message';
import { assignMachineSchema } from '@/validations/machines/assign-machine-schema';
import { Button, Card, Form, Select, Typography, message } from 'antd';
import { useState } from 'react';

const { Text } = Typography;

const yupSync = {
  async validator({ field }: any, value: any) {
    await assignMachineSchema.validateSyncAt(field, { [field]: value });
  },
};

const AssignForm = ({ user, assignees, machines }: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      const machine = await assignMachine(user, values.mid, values.uid);
      const message = `${machine.serial_no} assigned successful.`;
      displayMessage(messageApi, 'success', message);
      window.location.reload();
    } catch (error) {
      displayMessage(messageApi, 'error', 'Error in creating machine');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-7">
      {contextHolder}
      <Text className="text-gray-600 font-semibold">Assign Machines</Text>
      <div className="flex flex-row mt-5">
        <Form
          form={form}
          name="assign-machine"
          layout="horizontal"
          labelWrap
          labelAlign="left"
          labelCol={{ span: 6 }}
          onFinish={onFinish}
          className="w-full md:w-8/12 lg:w-6/12 xl:w-4/12"
        >
          <Form.Item label="Machines" name="mid" required rules={[yupSync]}>
            <Select
              placeholder="Select machine"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.props?.children
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {machines?.map((machine: any) => (
                <Select.Option key={machine.id} value={machine.id}>
                  {machine.serial_no}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Assign To" name="uid" required rules={[yupSync]}>
            <Select
              placeholder="Select assignee"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.props?.children
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {assignees?.map((assignee: any) => (
                <Select.Option
                  key={assignee.sb_auth_id}
                  value={assignee.sb_auth_id}
                >
                  {assignee.first_name} {assignee.last_name} @{' '}
                  {assignee.company?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item className="flex align-middle justify-end mb-1.5">
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
                {!loading ? 'Assign' : 'Assigning'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default AssignForm;

// dealer
// get list of machines associated to dealer and that no association to the farm manager
// get list of farm managers invited by the dealer
// assign & unassign
