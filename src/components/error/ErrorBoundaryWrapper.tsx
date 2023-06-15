import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

interface IErrorBoundaryProp {
  children: React.ReactNode;
}

export default function ErrorBoundaryWrapper({ children }: IErrorBoundaryProp) {
  const [hasError, setHasError] = useState(false);

  const handleTryAgain = () => {
    setHasError(false);
    window.location.reload();
  };

  if (hasError) {
    return (
      <ErrorFallback
        error={new Error('An error occurred!')}
        resetErrorBoundary={handleTryAgain}
      />
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleTryAgain}>
      {children}
    </ErrorBoundary>
  );
}
