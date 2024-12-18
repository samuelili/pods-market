import { createLazyFileRoute } from '@tanstack/react-router';
import CreateListing from '@/components/create/CreateListing.tsx';

export const Route = createLazyFileRoute('/create/listing')({
  component: CreateListing,
});
