import { Result, Button } from 'antd';
import Head from 'next/head';
import { FallbackProps } from 'react-error-boundary';

interface IErrorFallbackProps extends FallbackProps {
  onRetry: () => void;
  onGoHome: () => void;
}

export default function ErrorFallback({
  onRetry,
  onGoHome,
}: IErrorFallbackProps | any) {
  return (
    <>
      <Head>
        <title>Server Error | Abbey Machinery Monitoring System</title>
        <meta name="description" content="Server Error" />
        <meta name="author" content="De Jong Yeong" />
      </Head>
      <main className="flex flex-col w-full h-screen justify-center align-middle">
        <Result
          status="500"
          title="Internal Server Error"
          subTitle="Sorry, something went wrong. Contact support if error persists."
          extra={
            <div className="flex flex-row justify-center align-middle gap-2">
              <Button
                type="primary"
                onClick={onRetry}
                className="bg-custom-color hover:bg-hover-color"
              >
                Try again?
              </Button>
              <Button onClick={onGoHome}>Go to Home</Button>
            </div>
          }
        />
      </main>
    </>
  );
}
