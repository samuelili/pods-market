import { Outlet } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '@/logic/queryClient.ts';

const queryClient = getQueryClient();

const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/*<div className={styles.Background} />*/}
      <Outlet />
    </QueryClientProvider>
  );
};

export default Root;
