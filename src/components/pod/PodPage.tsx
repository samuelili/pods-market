import styles from '@/components/Root.module.css';
import ListingCard from '@/components/listing/ListingCard.tsx';
import ssdImg from '@/assets/images/ssd.png';
import djungelskogImg from '@/assets/images/djungelskog.png';
import chelseaImg from '@/assets/images/chelsea.jpg';
import Card from '@/components/card/Card.tsx';
import Button from '@/components/buttons/Button.tsx';
import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconUsersGroup,
  IconWorld,
} from '@tabler/icons-react';

const PodPage = () => {
  return (
    <>
      <Card className={'p-4'}>
        <div className={'flex flex-wrap items-center gap-4'}>
          <div className={'h-[4rem] w-[4rem] rounded-full bg-img'} />
          <h1 className={'text-4xl'}>Janky Left Cheek</h1>
        </div>
        <div className={'mt-4 flex flex-wrap gap-4'}>
          <div className={'flex flex-wrap gap-2'}>
            <IconUsersGroup />3 Listings
          </div>
          <div className={'flex flex-wrap gap-2'}>
            <IconUsersGroup />8 Members
          </div>
          <Button className={'-m-2 bg-transparent p-2'}>
            <IconBrandDiscord />
          </Button>
          <Button className={'-m-2 bg-transparent p-2'}>
            <IconBrandFacebook />
          </Button>
          <Button className={'-m-2 bg-transparent p-2'}>
            <IconWorld />
          </Button>
        </div>
        <p className={'mt-4'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium,
          odio et sagittis vehicula, magna lectus dictum ex, accumsan tincidunt
          dolor massa eget sapien. Maecenas ac lacinia lectus. Etiam arcu elit,
          egestas non tincidunt et, sollicitudin quis nibh. Aliquam porttitor
          ligula tellus, non faucibus mauris pharetra eget. Nunc eget ex cursus
          libero malesuada ultricies sagittis sit amet nulla. Etiam ultricies
          velit euismod, euismod metus commodo, volutpat ante. Etiam a elementum
          libero, a vulputate nisi. Fusce sed sem mi. Pellentesque vestibulum
          lectus vel risus commodo, id fringilla ex tempus. Praesent
          pellentesque, ante id lacinia lacinia, risus ex blandit orci, ut
          varius velit urna semper enim.
        </p>
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

export default PodPage;
