import { getCountries } from '@/utils/get-countries';
import { getDialCode } from '@/utils/get-dial-code';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Select, Tooltip } from 'antd';
import { useState } from 'react';

const dials = getDialCode();
const countries = getCountries();

export default function InviteForm({ senderId }: any) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // TODO: remove this, create role and get role from db
  console.log(senderId);

  return (
    <div className="flex flex-col mt-3 w-max h-max">
      <Form
        form={form}
        name="invite"
        labelWrap
        labelAlign="right"
        labelCol={{ span: 4 }}
      >
        <Form.Item label="Email" name="email" required>
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item label="Name" required className="mb-0">
          <div className="flex gap-2">
            <Form.Item name="first_name">
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item name="last_name">
              <Input placeholder="Last Name" />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item label="Phone" name="phone" required>
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
          <Form.Item name="company_name" className="mb-3">
            <Input placeholder="Company Name" />
          </Form.Item>
          <Form.Item name="address" className="mb-3">
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item name="city" className="mb-3">
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item name="country" initialValue="Ireland" className="mb-3">
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

        <Form.Item label="Role" name="role" required>
          <Input placeholder="Role" />
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
  );
}
