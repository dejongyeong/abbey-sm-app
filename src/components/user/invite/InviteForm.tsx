import { invite } from '@/services/user/invite';
import { IInvite } from '@/types/invite';
import { displayMessage } from '@/utils/display-message';
import { getCountries } from '@/utils/get-countries';
import { getDialCode } from '@/utils/get-dial-code';
import { inviteSchema } from '@/validations/user/invite-schema';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Select, Tooltip, message } from 'antd';
import { useState } from 'react';

const dials = getDialCode();
const countries = getCountries();

const yupSync = {
  async validator({ field }: any, value: any) {
    await inviteSchema.validateSyncAt(field, { [field]: value });
  },
};

export default function InviteForm({ senderId, roles }: any) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const onFinish = async (value: IInvite) => {
    setLoading(true);

    const params = {
      email: value.email,
      first_name: value.first_name,
      last_name: value.last_name,
      dial_code: value.dial_code,
      phone: value.phone,
      company: {
        name: value.company_name,
        street: value.address,
        city: value.city,
        state: value.country,
        zip: value.zip,
      },
      role_id: value.role_id,
      senderId: senderId,
    };

    try {
      const data = await invite(params);
      displayMessage(messageApi, 'success', data.message);
      window.location.reload();
    } catch (error) {
      displayMessage(messageApi, 'error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col mt-3 min-[426px]:w-max min-[426px]:h-max">
        <Form
          form={form}
          name="invite"
          labelWrap
          labelAlign="right"
          labelCol={{ span: 4 }}
          onFinish={onFinish}
        >
          <Form.Item label="Email" name="email" required rules={[yupSync]}>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item label="Name" required className="mb-0">
            <div className="flex flex-row gap-2 max-[426px]:flex-col max-[426px]:gap-0">
              <Form.Item name="first_name" rules={[yupSync]}>
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="last_name"
                className="max-[426px]:-mt-2"
                rules={[yupSync]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item label="Phone" name="phone" required rules={[yupSync]}>
            <Input
              placeholder="0831234567"
              addonBefore={
                <Form.Item name="dial_code" initialValue="+353" noStyle>
                  <Select options={dials} />
                </Form.Item>
              }
              suffix={
                <Tooltip title="Format: 0831234567 or 831234567">
                  <InfoCircleOutlined className="text-gray-600" />
                </Tooltip>
              }
            />
          </Form.Item>

          <Form.Item label="Company" className="mb-0">
            <Form.Item name="company_name" className="mb-3" rules={[yupSync]}>
              <Input placeholder="Company Name" />
            </Form.Item>
            <Form.Item name="address" className="mb-3" rules={[yupSync]}>
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item name="city" className="mb-3" rules={[yupSync]}>
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item
              name="country"
              initialValue="Ireland"
              className="mb-3"
              rules={[yupSync]}
            >
              <Select
                showSearch
                placeholder="Country"
                options={countries}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
            <Form.Item name="zip" rules={[yupSync]}>
              <Input placeholder="ZIP Code" />
            </Form.Item>
          </Form.Item>

          <Form.Item label="Role" name="role_id" required rules={[yupSync]}>
            <Select placeholder="Role">
              {roles.map((role: any) => (
                <Select.Option key={role.id} value={role.id}>
                  {role.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Divider />

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
                {!loading ? ' Invite' : 'Inviting'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
