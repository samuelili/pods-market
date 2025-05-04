import Button from '@/components/buttons/Button.tsx';
import {Listing, removeListing, updateListing} from '@/logic/store/listings.ts';
import { User } from '@/types/User.ts';
import { Pod } from '@/logic/store/pods.ts';
import { useState } from 'react';
import useCurrentUser from '@/logic/hooks/useCurrentUser.ts';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { uploadListingImages } from '@/logic/storage.ts';
import Card from '@/components/card/Card.tsx';
import ImagesSelectCard from '@/components/create/ImagesSelectCard.tsx';
import Loading from '@/components/general/Loading.tsx';
import { IconArrowLeft, IconTrash, IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from '@/logic/queries.ts';
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from '@tanstack/react-router';

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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [user] = useCurrentUser();
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

  const { mutate: deleteListing, isPending: deletePending } = useMutation({
    mutationKey: ['delete', listing.uid],
    async mutationFn() {
      await removeListing(listing.uid);
    },
    async onSuccess() {
      // invalidate data
      for (const podId of listing.podIds) {
        await queryClient.invalidateQueries({
          queryKey: queries.listings.pod(podId).queryKey,
        });
      }

      await navigate({
        from: `/pods/$podId`,
        to: '.',
        search: (prev) => ({
          ...prev,
          postId: '',
        }),
      });
    },
  });

  return (
    <form className={'contents'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex justify-between'}>
        <Button onClick={() => onFinished && onFinished()}>
          <IconArrowLeft />
          Back
        </Button>

        {/*TODO: cleanup*/}

        <Popover>
          <PopoverButton as={Button}>
            <IconTrash />
            Delete
          </PopoverButton>
          <PopoverPanel
            as={Card}
            anchor="bottom end"
            transition
            className={twMerge(
              'bg-img p-2 transition duration-200 [--anchor-gap:0.25rem]',
              'data-[closed]:-translate-y-2 data-[closed]:scale-95 data-[closed]:opacity-0',
            )}
          >
            <p className={'ml-1'}>Are you sure?</p>
            <div className={'mt-2 flex gap-2'}>
              <CloseButton as={Button}>
                <IconX />
                No
              </CloseButton>
              <Button
                onClick={() => {
                  deleteListing();
                }}
              >
                {deletePending ? (
                  <Loading />
                ) : (
                  <>
                    <IconTrash />
                    Yes, Delete
                  </>
                )}
              </Button>
            </div>
          </PopoverPanel>
        </Popover>
      </div>

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
