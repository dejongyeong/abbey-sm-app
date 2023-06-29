import DshLayout from '@/components/dashboard/Layout';
import SensorData from '@/components/sensors/historical-data/SensorData';

import { checkUserSessionSsr } from '@/services/auth/check-session-ssr';
import { getLoginUser } from '@/services/user/get-login-user';
import { getDefaultStartEndDate } from '@/utils/get-default-start-end-date';
import { Breadcrumb, Button, DatePicker, Form, Select } from 'antd';
import dayjs from 'dayjs';
import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';

const { RangePicker } = DatePicker;

export default function Home() {
  const [form] = Form.useForm();
  const { defaultStartDate, defaultEndDate } = getDefaultStartEndDate();

  const onFinish = async (value: any) => {
    console.log(value);
  };

  const initialValues = {
    'range-picker': [dayjs(defaultStartDate), dayjs(defaultEndDate)],
  };

  return (
    <main className="w-full h-auto">
      <Breadcrumb items={[{ title: 'Home' }, { title: 'Dashboard' }]} />
      <div className="h-auto mt-7 p-7 bg-white">
        <div className="flex justify-between align-middle gap-3 mb-3">
          <Form
            name="historical"
            layout="horizontal"
            labelWrap
            labelAlign="left"
            labelCol={{ span: 7 }}
            initialValues={initialValues}
            onFinish={onFinish}
          >
            <Form.Item name="serial" label="Machines:">
              <Select placeholder="Machine Serial Number">
                <Select.Option value="T100">T100</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="range-picker" label="Date Range:">
              <RangePicker className="w-full" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-custom-color hover:bg-hover-color"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        <SensorData />
      </div>
    </main>
  );
}

Home.getLayout = function getLayout(page: ReactNode, pageProps: any) {
  return (
    <DshLayout pageProps={pageProps} pageTitle="Dashboard">
      {page}
    </DshLayout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await checkUserSessionSsr(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  // get current user
  const user = await getLoginUser(session.user.id);

  return {
    props: {
      initialSession: session,
      uid: session.user.id,
      user: user,
    },
  };
};
