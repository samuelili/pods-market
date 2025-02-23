import { Outlet } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '@/logic/queryClient.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorBoundary from '@/components/general/ErrorBoundary.tsx';

const queryClient = getQueryClient();

const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ErrorBoundary fallback={<div>oops something went wrong!</div>}>
        <Outlet />
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default Root;
