import { createLazyFileRoute } from '@tanstack/react-router';
import AllListings from '@/components/pod/AllListings.tsx';

export const Route = createLazyFileRoute('/pods/all')({
  component: RouteComponent,
});

function RouteComponent() {
  return <AllListings />;
}
