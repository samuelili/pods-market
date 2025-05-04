import styles from './ListingCard.module.css';
import Card, { CardProps } from '@/components/card/Card.tsx';
import PosterWidget from '@/components/general/PosterWidget.tsx';
import queries from '@/logic/queries';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Listing } from '@/logic/store/listings.ts';
import FirebaseImage from '@/components/general/FirebaseImage.tsx';

export type ListingCardProps = CardProps & {
  listing: Listing;
};

const ListingCard = ({ listing, ...props }: ListingCardProps) => {
  const { data: seller } = useQuery(queries.users.user(listing.userId));
  const { data: pod } = useQuery({
    ...queries.pods.pod(listing.podIds[0]),
    enabled: listing.podIds[0] !== undefined,
  });

  return (
    <Link
      to={'.'}
      search={{
        postId: listing.uid,
      }}
    >
      <Card className={styles.ListingCard} hover={true} {...props}>
        <div className={styles.ImageContainer}>
          {listing.imageUrls[0] && (
            <FirebaseImage
              className="object-contain"
              path={listing.imageUrls[0]}
              resolution={640}
            />
          )}
        </div>

        <div className={'px-1 pb-1'}>
          <div className={'-mb-1 mt-1 flex items-center justify-between gap-3'}>
            <h2 className={styles.Name}>{listing.title}</h2>

            <h2 className={styles.Price}>${listing.price}</h2>
          </div>

          <PosterWidget
            className={'mt-2'}
            path={seller?.avatar ?? null}
            sellerName={seller?.name ?? ''}
            podName={pod?.name ?? ''}
          />
        </div>
      </Card>
    </Link>
  );
};

export default ListingCard;
