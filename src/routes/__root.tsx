import { createRootRoute, retainSearchParams } from '@tanstack/react-router';
import Root from '@/components/Root.tsx';

export const Route = createRootRoute({
  component: Root,
  search: {
    middlewares: [
      retainSearchParams<{
        postId?: string;
        userId?: string;
      }>(['postId', 'userId']),
    ],
  },
});
