import ErrorFallback from '@/components/error/ErrorFallback';
import { useRouter } from 'next/router';

const CustomErrorComponent = () => {
  const router = useRouter();

  const onRetry = () => {
    router.reload();
  };

  const onGoHome = () => {
    router.push('/');
  };

  return <ErrorFallback onRetry={onRetry} onGoHome={onGoHome} />;
};

export default CustomErrorComponent;
