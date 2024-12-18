import {
  IconArrowLeft,
  IconChevronLeft,
  IconChevronRight,
  IconMapPin,
  IconMessage,
  IconRuler2,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import Button from '@/components/buttons/Button.tsx';

import styles from './ListingDetailContent.module.css';
import LinkButton from '@/components/buttons/LinkButton.tsx';
import {useMatches} from "@tanstack/react-router";

export type ListingDetailContentProps = {
  imageSrc?: string;
  name: string;
  price: number;
  description: string;
  sellerName: string;
  podName: string;
};

const ListingDetailContent = ({
  imageSrc,
  name,
  price,
  description,
  sellerName,
  podName,
}: ListingDetailContentProps) => {
  const matches = useMatches()

  return (
    <>
      <LinkButton
        to={matches[matches.length - 1].fullPath}
        data-selected={false}
        search={(prev) => ({
          ...prev,
          postId: '',
        })}
      >
        <IconArrowLeft />
        Back
      </LinkButton>
      <div className={'relative mt-4 ' + styles.Image}>
        <Button
          className={
            'absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-transparent p-1'
          }
        >
          <IconChevronLeft />
        </Button>

        <img
          className={'h-full w-full rounded-md object-contain'}
          src={imageSrc}
          alt={name}
        />

        <Button
          className={
            'absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-transparent p-1'
          }
        >
          <IconChevronRight />
        </Button>
      </div>
      <div className={'px-1 pb-1'}>
        <div className={'mt-2 flex items-center justify-between'}>
          <h2 className={styles.Name}>{name}</h2>

          <h2 className={styles.Price}>${price}</h2>
        </div>

        <div className={'grid grid-cols-[1fr_auto] pt-2'}>
          <div className={'mt-2 flex items-center gap-2'}>
            <IconUser />
            <div className={'h-10 w-10 rounded-full bg-img'} />
            <p className={'flex-1 leading-tight'}>{sellerName}</p>
          </div>

          <div className={'mt-2 flex items-center gap-2'}>
            <IconMapPin />
            <p className={'flex-1 leading-tight'}>Davis</p>
          </div>

          <div className={'mt-2 flex items-center gap-2'}>
            <IconUsersGroup />
            <div className={'h-10 w-10 rounded-full bg-img'} />
            <p className={'flex-1 leading-tight'}>{podName}</p>
          </div>

          <div className={'mt-2 flex items-center gap-2'}>
            <IconRuler2 />
            <p className={'flex-1 leading-tight'}>12 mi.</p>
          </div>
        </div>
        <p className={'mt-4 ' + styles.Description}>{description}</p>
        <Button className={'mt-4 w-full justify-center py-3 text-center'}>
          <IconMessage /> Contact
        </Button>
      </div>
    </>
  );
};

export default ListingDetailContent;
