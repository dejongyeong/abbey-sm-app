import AuthLayout from '@/components/auth/Layout';
import { recoverPassword } from '@/services/auth/recover';
import { IRecoverPassword } from '@/types/auth';
import { displayMessage } from '@/utils/display-message';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, message } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

const title: string = 'Recover Password';

const { Text } = Typography;

export default function Recover() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const onFinish = async ({ email }: IRecoverPassword) => {
    setLoading(true);
    try {
      const data = await recoverPassword(email);
      displayMessage(messageApi, 'success', data.message);
    } catch (error) {
      displayMessage(messageApi, 'error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout pageTitle={title} formTitle={title}>
      {contextHolder}
      <Text>
        Enter the email associated with your account and we will send an email
        with instructions to reset your password.
      </Text>
      <Form
        form={form}
        name="recover"
        layout="vertical"
        onFinish={onFinish}
        className="w-full mt-6"
      >
        <Form.Item name="email" required>
          <Input
            prefix={
              <UserOutlined className="mr-1 text-black text-opacity-25" />
            }
            placeholder="Email Address"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
            className="w-full mb-5 bg-custom-color hover:bg-hover-color"
          >
            {!loading ? 'Send Instructions' : 'Sending'}
          </Button>
          <Link
            href="/auth/login"
            className="text-custom-color hover:text-custom-color"
          >
            Back to Login?
          </Link>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
}
