import AuthLayout from '@/components/auth/Layout';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { Typography } from 'antd';
import { useState } from 'react';
import { IResetPassword } from '../../../types/auth';
import { getUid, resetPassword } from '@/services/auth/reset';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { displayMessage } from '@/utils/display-message';

const title: string = 'Reset Password';

const { Text } = Typography;

export default function Reset() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);
  const router = useRouter();

  const onFinish = async ({ password }: IResetPassword) => {
    setLoading(true);
    try {
      const uid = await getUid(router.asPath);
      if (!uid) {
        throw new Error('404: Unable to find User ID');
      }

      const data = await resetPassword(uid, password);
      displayMessage(messageApi, 'success', data.message);
      router.push('/auth/login');
    } catch (error) {
      if ((error as Error).name === 'TokenExpiredError') {
        displayMessage(
          messageApi,
          'error',
          'Token to reset password expired. Please return to Login Page'
        );
      } else {
        displayMessage(messageApi, 'error', (error as Error).message);
      }
      setExpired(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout pageTitle={title} formTitle={title}>
      {contextHolder}
      <Text>Please enter a new and secure password below.</Text>
      <Form
        form={form}
        name="reset"
        layout="vertical"
        onFinish={onFinish}
        className="w-full mt-5"
      >
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
            loading={loading}
            disabled={loading}
            className="w-full mb-5 bg-custom-color hover:bg-hover-color"
          >
            {!loading ? 'Reset Password' : 'Updating'}
          </Button>

          {expired ? (
            <>
              <Text type="danger">Reset Password Token Expired. </Text>
              <Link
                href="/auth/login"
                className="text-custom-color hover:text-custom-color"
              >
                Back to Login?
              </Link>
            </>
          ) : null}
        </Form.Item>
      </Form>
    </AuthLayout>
  );
}
