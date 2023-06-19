import { Button, Result } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  const onGoHome = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Page Not Found | Abbey Machinery Monitoring System</title>
        <meta name="description" content="Page Not Found" />
        <meta name="author" content="De Jong Yeong" />
      </Head>
      <main className="flex flex-col w-full h-screen justify-center align-middle">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <div className="flex flex-row justify-center align-middle gap-2">
              <Button
                type="primary"
                onClick={onGoHome}
                className="bg-custom-color hover:bg-hover-color"
              >
                Go to Home
              </Button>
            </div>
          }
        />
      </main>
    </>
  );
}
