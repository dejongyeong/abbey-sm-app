import ErrorFallback from '@/components/error/ErrorFallback';
import { useRouter } from 'next/router';
import { ErrorBoundary } from 'react-error-boundary';

const CustomErrorComponent = ({ error }: { error: Error | any }) => {
  const router = useRouter();

  const onRetry = () => {
    router.reload();
  };

  const onGoHome = () => {
    router.push('/');
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ErrorFallback error={error} onRetry={onRetry} onGoHome={onGoHome} />
    </ErrorBoundary>
  );
};

export default CustomErrorComponent;
