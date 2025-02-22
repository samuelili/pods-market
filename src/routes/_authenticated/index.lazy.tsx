import { createLazyFileRoute } from '@tanstack/react-router';
import HomePage from '@/components/home/HomePage.tsx';

export const Route = createLazyFileRoute('/_authenticated/')({
  component: HomePage,
});