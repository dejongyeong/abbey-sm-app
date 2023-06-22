import AuthLayout from '@/components/auth/Layout';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IResetPassword } from '../../../types/auth';
import { getUid } from '@/services/auth/reset';
import { confirm } from '@/services/auth/confirm';
import { toast } from 'react-toastify';
import { accountConfirmSchema } from '@/validations/auth/account-confirm-schema';

const title: string = 'Confirm Account';

const { Text } = Typography;

const yupSync = {
  async validator({ field }: any, value: any) {
    await accountConfirmSchema.validateSyncAt(field, { [field]: value });
  },
};

export default function Confirm() {
  const [form] = Form.useForm();
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

      const data = await confirm(uid, password);
      toast.success(`${data.message}`);
      router.push('/auth/login');
    } catch (error) {
      if ((error as Error).name === 'TokenExpiredError') {
        toast.error(
          'Token to confirm account expired. Contact inviter to resend an invite link.'
        );
      } else {
        toast.error((error as Error).message);
      }
      setExpired(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout pageTitle={title} formTitle={title}>
      <Text>Please create a strong, secure password.</Text>

      <Form
        form={form}
        name="confirm"
        layout="vertical"
        onFinish={onFinish}
        className="w-full mt-5"
      >
        <Form.Item name="password" required hasFeedback rules={[yupSync]}>
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
            className="w-full mb-5 bg-custom-color hover:bg-hover-color"
          >
            {!loading ? 'Confirm Account' : 'Confirming'}
          </Button>

          {expired ? (
            <Text type="danger">
              Account Confirmation Token Expired. Contact Support to resend an
              Invite Link.
            </Text>
          ) : null}
        </Form.Item>
      </Form>
    </AuthLayout>
  );
}
