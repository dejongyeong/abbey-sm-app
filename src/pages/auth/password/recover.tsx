import AuthLayout from '@/components/auth/Layout';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import Link from 'next/link';

// TODO: Link and Logic

const title: string = 'Recover Password';

const { Text } = Typography;

export default function Recover() {
  const [form] = Form.useForm();

  return (
    <AuthLayout pageTitle={title} formTitle={title}>
      <Text>
        Enter the email associated with your account and we will send an email
        with instructions to reset your password.
      </Text>
      <Form
        form={form}
        name="recover"
        layout="vertical"
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
            className="w-full mb-5 bg-custom-color hover:bg-hover-color"
          >
            Send Instructions
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

{
  /* <button
        onClick={async () => {
          const data = {
            to: 'dejong.re2@gmail.com',
            from: 'dejong.yeong@mtu.ie',
            subject: 'Test',
            html: '<p>This is a test email</p>',
          };

          try {
            const response = await fetch('/api/send-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });

            if (response.ok) {
              console.log(response.statusText);
            } else {
              console.log(response.statusText);
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Send Email
      </button> */
}
