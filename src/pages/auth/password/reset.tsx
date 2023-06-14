import AuthLayout from '@/components/auth/Layout';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Typography } from 'antd';

// TODO: Link and Logic and Email

const title: string = 'Reset Password';

const { Text } = Typography;

export default function Reset() {
  const [form] = Form.useForm();
  return (
    <AuthLayout pageTitle={title} formTitle={title}>
      <Text>
        Please enter a new password below for <strong>Email</strong>.
      </Text>

      <Form form={form} name="reset" layout="vertical" className="w-full mt-5">
        <Form.Item name="password" required hasFeedback>
          <Input.Password
            prefix={
              <LockOutlined className="mr-1 text-black text-opacity-25" />
            }
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          required
          hasFeedback
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={
              <LockOutlined className="mr-1 text-black text-opacity-25" />
            }
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full mb-3 bg-custom-color hover:bg-hover-color"
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
}
