import { Button, Checkbox, Form, Input } from 'antd';
import AuthLayout from '@/components/auth/Layout';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { loginSchema } from '@/validations/auth/login-schema';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ILogin } from '../../types/auth';
import { login } from '@/services/auth/login';
import { toast } from 'react-toastify';

const title: string = 'Login';

const yupSync = {
  async validator({ field }: any, value: any) {
    await loginSchema.validateSyncAt(field, { [field]: value });
  },
};

export default function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async ({ email, password, remember }: ILogin) => {
    setLoading(true);
    try {
      const data = await login(email, password);
      toast.success(data.message);
      router.push('/');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout pageTitle={title} formTitle={title}>
      <Form
        form={form}
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="w-full"
      >
        <Form.Item name="email" required rules={[yupSync]}>
          <Input
            prefix={
              <UserOutlined className="mr-1 text-black text-opacity-25" />
            }
            placeholder="Email Address"
          />
        </Form.Item>

        <Form.Item name="password" required rules={[yupSync]}>
          <Input
            prefix={
              <LockOutlined className="mr-1 text-black text-opacity-25" />
            }
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" rules={[yupSync]}>
          <Checkbox>Remember me?</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
            className="w-full mb-5 bg-custom-color hover:bg-hover-color"
          >
            {!loading ? 'Sign In' : 'Signing In'}
          </Button>
          <Link
            href="/auth/password/recover"
            className="text-custom-color hover:text-custom-color"
          >
            Forgot Password?
          </Link>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
}
