import { useQuery } from '@tanstack/react-query';
import ListingDetailContent from './ListingDetailContent';
import queries from '@/logic/queries';
import { useSearch } from '@tanstack/react-router';

const ListingPage = () => {
  const search = useSearch({
    strict: false,
  });

  const { data: listing } = useQuery(queries.listings.listing(search?.postId!));
  const { data: seller } = useQuery({
    ...queries.users.user(listing?.userId ?? ''),
    enabled: listing?.userId !== null && listing?.userId !== undefined,
  });
  const { data: pod } = useQuery({
    ...queries.pods.pod(listing?.podIds[0] ?? ''),
    enabled: listing !== undefined,
  });

  if (!listing || !seller || !pod)
    return <h1 className="text-2xl">listing not found ;-;</h1>;

  return <ListingDetailContent listing={listing} seller={seller} pod={pod} />;
};

export default ListingPage;
