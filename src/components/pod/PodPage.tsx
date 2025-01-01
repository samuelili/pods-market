import styles from '@/components/Root.module.css';
import ListingCard from '@/components/listing/ListingCard.tsx';
import ssdImg from '@/assets/images/ssd.png';
import djungelskogImg from '@/assets/images/djungelskog.png';
import chelseaImg from '@/assets/images/chelsea.jpg';
import Card from '@/components/card/Card.tsx';
import {
  IconCards,
  IconPencil,
  IconUserPlus,
  IconUsersGroup,
} from '@tabler/icons-react';
import { getRouteApi } from '@tanstack/react-router';
import { user } from '@/logic/auth.ts';
import Button from '@/components/buttons/Button.tsx';
import InviteButton from "@/components/pod/InviteButton.tsx";

const routeApi = getRouteApi('/_authenticated/pods/$podId');

const PodPage = () => {
  const pod = routeApi.useLoaderData();

  if (!pod)
    return (
      <Card className={'p-layout'}>
        <h1 className={'text-2xl'}>Pod Not Found</h1>
      </Card>
    );

  const isModerator = pod.moderators.includes(user!.uid);

  return (
    <>
      <Card className={'p-4'}>
        <div className={'flex flex-wrap items-center gap-4'}>
          {pod.photoUrl && (
            <div className={'h-[4rem] w-[4rem] rounded-full bg-img'} />
          )}
          <h1 className={'flex-1 text-4xl'}>{pod.name}</h1>

          <div className={'flex gap-2'}>
            <InviteButton/>
            {isModerator && (
              <Button className={'p-2'}>
                <IconPencil />
              </Button>
            )}
          </div>
        </div>
        <div className={'mt-4 flex flex-wrap gap-4'}>
          <div className={'flex flex-wrap gap-2'}>
            <IconCards />3 Listings
          </div>
          <div className={'flex flex-wrap gap-2'}>
            <IconUsersGroup />
            {pod.users.length} Members
          </div>
          {/*<Button className={'-m-2 bg-transparent p-2'}>*/}
          {/*  <IconBrandDiscord />*/}
          {/*</Button>*/}
          {/*<Button className={'-m-2 bg-transparent p-2'}>*/}
          {/*  <IconBrandFacebook />*/}
          {/*</Button>*/}
          {/*<Button className={'-m-2 bg-transparent p-2'}>*/}
          {/*  <IconWorld />*/}
          {/*</Button>*/}
        </div>
        <p className={'mt-4'}>{pod.description}</p>
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
