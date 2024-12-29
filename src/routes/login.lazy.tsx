import { createLazyFileRoute } from '@tanstack/react-router';
import LoginPage from '@/components/signin/LoginPage.tsx';

export const Route = createLazyFileRoute('/login')({
  component: LoginPage,
});
