import { Typography } from 'antd';
import Head from 'next/head';
import Image from 'next/image';
import { ReactNode } from 'react';

const APP_DESCRIPTION = 'SMA to monitor Tankers or Feeders telemetry';

const { Title } = Typography;

type TProps = {
  children: ReactNode;
  pageTitle?: string;
  formTitle?: string;
};

const Logo = () => {
  return (
    <Image
      priority
      src="/icon-384x384.png"
      alt="Abbey Machinery Company Logo"
      width={192}
      height={192}
    />
  );
};

export default function AuthLayout({ children, pageTitle, formTitle }: TProps) {
  return (
    <>
      <Head>
        <title>{`Abbey Machinery Monitoring System | ` + pageTitle}</title>
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="author" content="De Jong Yeong" />
      </Head>
      <main className="flex w-full h-screen justify-center items-center bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
        <div className="lg:w-2/6 sm:w-4/6 px-6 py-8 rounded-none bg-white">
          <div className="flex flex-col justify-center items-center">
            <Logo />
          </div>
          <div className="flex flex-col gap-3">
            <Title level={5}>{formTitle}</Title>
            <div>{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}
