import Card from '@/components/card/Card.tsx';
import styles from '@/components/Root.module.css';
import ListingCard from '@/components/listing/ListingCard.tsx';
import ssdImg from '@/assets/images/ssd.png';
import djungelskogImg from '@/assets/images/djungelskog.png';
import chelseaImg from '@/assets/images/chelsea.jpg';
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
        {listings?.map((listing) =>
          <ListingCard
            key={listing.uid}
            name={listing.title}
            description={listing.description}
            podName={''}
            price={listing.price}
            imageSrc={ssdImg}
            userId={listing.userId}
          />)}

      </div>
    </>
  );
};

export default AllListings;
