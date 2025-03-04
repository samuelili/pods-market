import { useQuery } from '@tanstack/react-query';
import ListingDetailContent from './ListingDetailContent';
import queries from '@/logic/queries';
import { useSearch } from '@tanstack/react-router';
import Loading from "@/components/general/Loading.tsx";

const ListingPage = () => {
  const search = useSearch({
    strict: false,
  });

  const { data: listing, isFetching: listingIsFetching } = useQuery(queries.listings.listing(search?.postId!));
  const { data: seller, isFetching: sellerIsFetching } = useQuery({
    ...queries.users.user(listing?.userId ?? ''),
    enabled: listing?.userId !== null && listing?.userId !== undefined,
  });
  const { data: pod, isFetching: podIsFetching } = useQuery({
    ...queries.pods.pod(listing?.podIds[0] ?? ''),
    enabled: listing !== undefined,
  });

  const noData = !listing || !seller || !pod;
  const isFetching = listingIsFetching || sellerIsFetching || podIsFetching;

  if (noData && isFetching) {
    return <h1><Loading /></h1>
  }

  if (noData)
    return <h1 className="text-2xl">listing not found ;-;</h1>;

  return <ListingDetailContent listing={listing} seller={seller} pod={pod} />;
};

export default ListingPage;
