import Button from '@/components/buttons/Button.tsx';
import { Listing, updateListing } from '@/logic/store/listings.ts';
import { User } from '@/types/User.ts';
import { Pod } from '@/logic/store/pods.ts';
import { useState } from 'react';
import useCurrentUser from '@/logic/hooks/useCurrentUser.ts';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { uploadListingImages } from '@/logic/storage.ts';
import Card from '@/components/card/Card.tsx';
import ImagesSelectCard from '@/components/create/ImagesSelectCard.tsx';
import Loading from '@/components/general/Loading.tsx';
import { IconArrowLeft } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import queries from '@/logic/queries.ts';

export type ListingDetailContentProps = {
  listing: Listing;
  seller: User;
  pod: Pod;
  onFinished?: () => void;
};

type Inputs = {
  images: (string | File)[];

  title: string;
  price: string;
  description: string;
  location: string;
};

const ListingDetailContent = ({
  listing,
  onFinished,
}: ListingDetailContentProps) => {
  const [user] = useCurrentUser();
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      images: listing.imageUrls,

      title: listing.title,
      price: String(listing.price),
      description: listing.description,
      location: listing.location,
    },
  });

  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!listing) return;
    setLoading(true);

    // first, upload files
    const updatedImagesIndices: number[] = [];
    const uploadResults = await uploadListingImages(
      data.images.filter((image, i) => {
        if (image instanceof File) updatedImagesIndices.push(i);
        return true;
      }) as File[],
    );

    const updatedListing = await updateListing(listing.uid, {
      imageUrls: data.images.map((original, i) => {
        if (updatedImagesIndices.includes(i)) {
          return uploadResults[i].ref.fullPath;
        }
        return original;
      }) as string[],
      title: data.title,
      price: parseInt(data.price),
      description: data.description,
      location: data.location,
      userId: user.uid,
    });

    queryClient.setQueryData(
      queries.listings.listing(listing.uid).queryKey,
      updatedListing,
    );

    setLoading(false);

    onFinished && onFinished();
  };

  return (
    <form className={'p-layout'} onSubmit={handleSubmit(onSubmit)}>
      <Button onClick={() => onFinished && onFinished()}>
        <IconArrowLeft />
        Back
      </Button>

      <h3 className={'mt-4 text-lg'}>
        Upload Images{' '}
        <p className={'text-sm text-red-300'}>{errors.images?.message}</p>
      </h3>
      <Controller
        control={control}
        rules={{
          required: 'Please provide at least 1 image',
        }}
        render={({ field: { onChange, value } }) => (
          <ImagesSelectCard files={value} onFilesChange={onChange} />
        )}
        name={'images'}
      />

      <div className={'mt-layout flex gap-layout'}>
        <label className={'flex-1'}>
          <h3 className={'text-lg'}>
            Listing Title
            <p className={'text-sm text-red-300'}>{errors.title?.message}</p>
          </h3>
          <input
            className={'mt-2'}
            placeholder={'Djungelskog'}
            {...register('title', {
              required: 'Please provide a title',
            })}
          />
        </label>

        <label>
          <h3 className={'text-lg'}>
            Price
            <p className={'text-sm text-red-300'}>{errors.price?.message}</p>
          </h3>
          <input
            className={'mt-2'}
            placeholder={'$$$'}
            {...register('price', {
              required: 'Please provide a price',
              min: {
                value: 0,
                message: 'Please provide a price that is at least $0',
              },
            })}
            min={0}
            type={'number'}
          />
        </label>
      </div>

      <label className={'mt-layout block'}>
        <h3 className={'text-lg'}>
          Description
          <p className={'text-sm text-red-300'}>
            {errors.description?.message}
          </p>
        </h3>
        <textarea
          className={'mt-2'}
          placeholder={'Lorem ipsum dolor sit amet...'}
          {...register('description', {
            required: 'Please provide a description',
          })}
        />
      </label>

      <label className={'mt-layout block'}>
        <h3 className={'text-lg'}>
          Location
          <p className={'text-sm text-red-300'}>{errors.location?.message}</p>
        </h3>
        <input
          className={'mt-2'}
          placeholder={'Davis, CA'}
          {...register('location', {
            required: 'Please specify a location',
          })}
        />
      </label>

      <Card className={'mt-layout bg-transparent p-0'}>
        <Button
          className={
            'heading h-[4rem] w-full items-center justify-center text-2xl'
          }
        >
          {loading ? <Loading /> : 'Update Listing'}
        </Button>
      </Card>
    </form>
  );
};

export default ListingDetailContent;
