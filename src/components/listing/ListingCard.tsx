import styles from './ListingCard.module.css';
import Card, { CardProps } from '@/components/card/Card.tsx';
import PosterWidget from '@/components/general/PosterWidget.tsx';
import { Link } from '@tanstack/react-router';

export type ListingCardProps = CardProps & {
  imageSrc?: string;
  name: string;
  price: number;
  description: string;
  podName: string;
  sellerName: string;
};

const ListingCard = ({
  imageSrc,
  name,
  price,
  description,
  podName,
  sellerName,
  ...props
}: ListingCardProps) => {
  return (
    <Link
      to={'.'}
      search={{
        postId: 'asdf',
      }}
    >
      <Card className={styles.ListingCard} hover={true} {...props}>
        <div className={styles.ImageContainer}>
          {imageSrc && <img src={imageSrc} alt={name} />}
        </div>

        <div className={'px-1 pb-1'}>
          <div className={'-mb-1 mt-1 flex items-center justify-between gap-3'}>
            <h2 className={styles.Name}>{name}</h2>

            <h2 className={styles.Price}>${price}</h2>
          </div>

          <PosterWidget
            className={'mt-2'}
            src={''}
            sellerName={sellerName}
            podName={podName}
          />
        </div>
      </Card>
    </Link>
  );
};

export default ListingCard;
