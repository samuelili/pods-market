import Card from '@/components/card/Card.tsx';
import styles from '@/components/Root.module.css';
import ListingCard from '@/components/listing/ListingCard.tsx';
import ssdImg from '@/assets/images/ssd.png';
import djungelskogImg from '@/assets/images/djungelskog.png';
import chelseaImg from '@/assets/images/chelsea.jpg';

const AllListings = () => {
  return (
    <>
      <Card className={'p-4'}>
        <h1 className={'text-4xl'}>All Listings</h1>
      </Card>
      <div className={'mt-4 ' + styles.ListingGrid}>
        <ListingCard
          name={'512GB Samsung SSD'}
          description={
            "I got them when a company liquidated but they're a little used"
          }
          podName={'Sorrentoes'}
          price={20}
          imageSrc={ssdImg}
          sellerName={'Samuel'}
        />
        <ListingCard
          name={'Djungelskog'}
          description={'very fresh not squished very huggable lovely'}
          podName={'Janky Left Cheek'}
          price={16}
          imageSrc={djungelskogImg}
          sellerName={'Shmuel'}
        />

        <ListingCard
          name={'Chelsea - 2008 Scion xD'}
          description={"goodbye :'("}
          podName={'AACF'}
          price={5000}
          imageSrc={chelseaImg}
          sellerName={'Samuel'}
        />
      </div>
    </>
  );
};

export default AllListings;
