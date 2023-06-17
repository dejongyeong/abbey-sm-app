import { Layout } from 'antd';
import Head from 'next/head';
import { ReactNode } from 'react';
import Logo from '../shared/dashboard/Logo';

const APP_DESCRIPTION = 'SMA Dashboard to monitor Tankers or Feeders telemetry';

type TProps = {
  children: ReactNode;
  pageProps: any;
  pageTitle?: string;
};

const { Content, Sider, Footer } = Layout;

export default function DshLayout({ children, pageTitle }: TProps) {
  return (
    <>
      <Head>
        <title>{`Abbey Machinery Monitoring System | ` + pageTitle}</title>
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="author" content="De Jong Yeong" />
      </Head>
      <main className="w-full h-screen">
        <Layout>
          <Sider>
            <Logo />
            <p>Navigation</p>
          </Sider>
          <Layout>
            <p>Banner</p>
            <Content>{children}</Content>
            <Footer className="text-center mt-8">
              MTU & Abbey Machinery - Smart Machine App Prototype @{' '}
              {new Date().getFullYear()}
            </Footer>
          </Layout>
        </Layout>
      </main>
    </>
  );
}
