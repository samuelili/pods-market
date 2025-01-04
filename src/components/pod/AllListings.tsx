import Card from '@/components/card/Card.tsx';
import styles from '@/components/Root.module.css';
import ListingCard from '@/components/listing/ListingCard.tsx';
import { useQuery } from '@tanstack/react-query';
import queries from '@/logic/queries';

const AllListings = () => {
  const { data: listings } = useQuery(queries.listings.all);

  return (
    <>
      <Card className={'p-4'}>
        <h1 className={'text-4xl'}>All Listings</h1>
      </Card>
      <div className={'mt-4 ' + styles.ListingGrid}>
        {listings?.map((listing) => (
          <ListingCard key={listing.uid} listing={listing} />
        ))}
      </div>
    </>
  );
};

export default AllListings;
