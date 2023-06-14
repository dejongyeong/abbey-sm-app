import { Button, Checkbox, Form, Input } from 'antd';
import AuthLayout from '@/components/auth/Layout';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';

const title: string = 'Login';

// TODO: Link

export default function Login() {
  const [form] = Form.useForm();

  return (
    <AuthLayout pageTitle={title} formTitle={title}>
      <Form form={form} name="login" layout="vertical" className="w-full">
        <Form.Item name="email" required>
          <Input
            prefix={
              <UserOutlined className="mr-1 text-black text-opacity-25" />
            }
            placeholder="Email Address"
          />
        </Form.Item>

        <Form.Item name="password" required>
          <Input
            prefix={
              <LockOutlined className="mr-1 text-black text-opacity-25" />
            }
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me?</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full mb-5 bg-custom-color hover:bg-hover-color"
          >
            Login
          </Button>
          <Link href="#" className="text-custom-color hover:text-custom-color">
            Forgot Password?
          </Link>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
}
