import styles from '@/components/Root.module.css';
import ListingCard from '@/components/listing/ListingCard.tsx';
import Card from '@/components/card/Card.tsx';
import { IconCards, IconPencil, IconUsersGroup } from '@tabler/icons-react';
import { getRouteApi } from '@tanstack/react-router';
import Button from '@/components/buttons/Button.tsx';
import InviteButton from '@/components/pod/InviteButton.tsx';
import useCurrentUser from '@/logic/hooks/useCurrentUser.ts';
import { useQuery } from '@tanstack/react-query';
import queries from '@/logic/queries';

const routeApi = getRouteApi('/_authenticated/pods/$podId');

const PodPage = () => {
  const pod = routeApi.useLoaderData();
  const [user] = useCurrentUser();

  const { data: listings } = useQuery({
    ...queries.listings.pod(pod?.uid ?? ''),
    enabled: pod?.uid !== undefined,
  });

  if (!pod)
    return (
      <Card className={'p-layout'}>
        <h1 className={'text-2xl'}>Pod Not Found</h1>
      </Card>
    );

  const isModerator = pod.moderators.includes(user.uid);

  return (
    <>
      <Card className={'p-4'}>
        <div className={'flex flex-wrap items-center gap-4'}>
          {pod.photoUrl && (
            <div className={'h-[4rem] w-[4rem] rounded-full bg-img'} />
          )}
          <h1 className={'flex-1 text-4xl'}>{pod.name}</h1>

          <div className={'flex gap-2'}>
            <InviteButton />
            {isModerator && (
              <Button className={'p-2'}>
                <IconPencil />
              </Button>
            )}
          </div>
        </div>
        <div className={'mt-4 flex flex-wrap gap-4'}>
          <div className={'flex flex-wrap gap-2'}>
            <IconCards />
            {listings?.length} Listing{listings?.length !== 1 && "s"}
          </div>
          <div className={'flex flex-wrap gap-2'}>
            <IconUsersGroup />
            {pod.users.length} Member{pod.users.length !== 1 && "s"}
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
        {listings?.map((listing) => (
          <ListingCard key={listing.uid} listing={listing} />
        ))}
      </div>
    </>
  );
};

export default PodPage;
