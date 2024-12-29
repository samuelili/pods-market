import { createLazyFileRoute } from '@tanstack/react-router';
import CreatePod from '@/components/create/CreatePod.tsx';

export const Route = createLazyFileRoute('/_authenticated/create/pod')({
  component: CreatePod,
});
