import { FallbackProps } from 'react-error-boundary';

interface IErrorFallbackProps extends FallbackProps {
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: IErrorFallbackProps) {
  return (
    <>
      <h2>Oops, there is an error!</h2>
      <p>{error?.message}</p>
      <button type="button" onClick={resetErrorBoundary}>
        Try again?
      </button>
    </>
  );
}
