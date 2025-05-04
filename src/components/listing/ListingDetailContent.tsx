import {
  IconArrowLeft,
  IconChevronLeft,
  IconChevronRight,
  IconMapPin,
  IconPencil,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import Button from '@/components/buttons/Button.tsx';

import styles from './ListingDetailContent.module.css';
import LinkButton from '@/components/buttons/LinkButton.tsx';
import { useMatches } from '@tanstack/react-router';
import FirebaseImage from '@/components/general/FirebaseImage.tsx';
import { Listing } from '@/logic/store/listings.ts';
import { User } from '@/types/User.ts';
import { Pod } from '@/logic/store/pods.ts';
import { useEffect, useState } from 'react';
import Avatar from '@/components/general/Avatar.tsx';
import useCurrentUser from '@/logic/hooks/useCurrentUser.ts';

export type ListingDetailContentProps = {
  listing: Listing;
  seller: User;
  pod: Pod;
  onEdit?: () => void;
};

const ListingDetailContent = ({
  listing,
  seller,
  pod,
  onEdit,
}: ListingDetailContentProps) => {
  const matches = useMatches();
  const backPath = matches[matches.length - 1].fullPath;
  const [user] = useCurrentUser();

  const [imageIndex, setImageIndex] = useState(0);

  // reset if listing uid changes
  useEffect(() => {
    setImageIndex(0);
  }, [listing.uid]);

  return (
    <>
      <div className={'flex justify-between'}>
        <LinkButton
          to={backPath === '' ? '/' : backPath}
          data-selected={false}
          search={(prev) => ({
            ...prev,
            postId: '',
          })}
        >
          <IconArrowLeft />
          Back
        </LinkButton>

        {user.uid === listing.userId && (
          <Button onClick={() => onEdit && onEdit()}>
            <IconPencil />
            Edit
          </Button>
        )}
      </div>

      <div className={'relative mt-layout ' + styles.Image}>
        {imageIndex > 0 && (
          <Button
            className={
              'absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-transparent p-1'
            }
            onClick={() => {
              setImageIndex(Math.max(0, imageIndex - 1));
            }}
          >
            <IconChevronLeft />
          </Button>
        )}

        <FirebaseImage
          className={'h-full w-full rounded-md object-contain'}
          path={listing.imageUrls[imageIndex]}
          resolution={1920}
        />

        {imageIndex < listing.imageUrls.length - 1 && (
          <Button
            className={
              'absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-transparent p-1'
            }
            onClick={() => {
              setImageIndex(
                Math.min(listing.imageUrls.length - 1, imageIndex + 1),
              );
            }}
          >
            <IconChevronRight />
          </Button>
        )}
      </div>
      <div className={'px-1 pb-1'}>
        <div className={'mt-2 flex items-center justify-between'}>
          <h2 className={styles.Name}>{listing.title}</h2>

          <h2 className={styles.Price}>${listing.price}</h2>
        </div>

        <div className={'grid grid-cols-[1fr_auto] pt-2'}>
          <div className={'mt-2 flex items-center gap-2'}>
            <IconUser />
            <Avatar name={seller.name} path={seller.avatar} />
            <p className={'flex-1 leading-tight'}>{seller.name}</p>
          </div>

          <div className={'mt-2 flex items-center gap-2'}>
            <IconMapPin />
            <p className={'flex-1 leading-tight'}>Davis, CA</p>
          </div>

          <div className={'mt-2 flex items-center gap-2'}>
            <IconUsersGroup />
            <Avatar name={pod.name} path={pod.photoUrl} />
            <p className={'flex-1 leading-tight'}>{pod.name}</p>
          </div>

          {/*<div className={'mt-2 flex items-center gap-2'}>*/}
          {/*  <IconRuler2 />*/}
          {/*  <p className={'flex-1 leading-tight'}>12 mi.</p>*/}
          {/*</div>*/}
        </div>
        <p className={'mt-4 ' + styles.Description}>{listing.description}</p>
        {/*<ListingSendRequest listing={listing} />*/}
      </div>
    </>
  );
};

export default ListingDetailContent;
