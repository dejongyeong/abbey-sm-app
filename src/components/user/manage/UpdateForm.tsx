import { getCountries } from '@/utils/get-countries';
import { getDialCode } from '@/utils/get-dial-code';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Tooltip, message } from 'antd';

const countries = getCountries();
const dials = getDialCode();

const UpdateForm = ({ user, roles }: any) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  console.log(user);

  const initialValues = {
    email: user?.email,
    first_name: user?.first_name,
    last_name: user?.last_name,
    dial_code: user?.dial_code,
    phone: user?.phone,
    company_name: user?.company.name,
    address: user?.company.address,
    city: user?.company.address,
    country: user?.company.state,
    zip: user?.company.zip,
    role_id: user?.role_id,
  };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col mt-6 w-full min-[426px]:h-max">
        <Form
          form={form}
          name="update-user"
          labelWrap
          labelAlign="right"
          labelCol={{ span: 4 }}
          initialValues={initialValues}
        >
          <Form.Item label="Email" name="email" required>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item label="Name" required className="mb-0">
            <div className="flex flex-row gap-2 max-[426px]:flex-col max-[426px]:gap-0">
              <Form.Item name="first_name" className="w-1/2 max-[426px]:w-full">
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="last_name"
                className="w-1/2 max-[426px]:w-full max-[426px]:-mt-2"
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item label="Phone" name="phone" required>
            <Input
              placeholder="0831234567"
              addonBefore={
                <Form.Item name="dial_code" noStyle>
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
            <Form.Item name="company_name" className="mb-3">
              <Input placeholder="Company Name" />
            </Form.Item>
            <Form.Item name="address" className="mb-3">
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item name="city" className="mb-3">
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item name="country" className="mb-3">
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
            <Form.Item name="zip">
              <Input placeholder="ZIP Code" />
            </Form.Item>
          </Form.Item>

          <Form.Item label="Role" name="role_id" required>
            <Select placeholder="Role">
              {roles.map((role: any) => (
                <Select.Option key={role.id} value={role.id}>
                  {role.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item className="flex align-middle justify-end">
            <div className="flex align-middle justify-end gap-2">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-custom-color hover:bg-hover-color"
              >
                Update
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UpdateForm;
