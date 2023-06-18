import { Layout } from 'antd';
import Head from 'next/head';
import { ReactNode } from 'react';
import Logo from '../shared/dashboard/Logo';
import Navigation from '../shared/dashboard/Navigation';
import Banner from '../shared/dashboard/Banner';

const APP_DESCRIPTION = 'SMA Dashboard to monitor Tankers or Feeders telemetry';

type TProps = {
  children: ReactNode;
  pageProps: any;
  pageTitle?: string;
};

const { Content, Sider, Footer } = Layout;

export default function DshLayout({ children, pageProps, pageTitle }: TProps) {
  return (
    <>
      <Head>
        <title>{`Abbey Machinery Monitoring System | ` + pageTitle}</title>
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="author" content="De Jong Yeong" />
      </Head>
      <main className="w-full h-auto">
        <Layout>
          <Sider breakpoint="lg" collapsedWidth="0">
            <Logo />
            <Navigation />
          </Sider>
          <Layout>
            <Banner />
            <Content className="w-full h-auto p-8">{children}</Content>
            <Footer className="text-center mt-6">
              MTU & Abbey Machinery - Smart Machine App Prototype @{' '}
              {new Date().getFullYear()}
            </Footer>
          </Layout>
        </Layout>
      </main>
    </>
  );
}
