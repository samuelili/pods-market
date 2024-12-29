import Card from '@/components/card/Card.tsx';
import Button from '@/components/buttons/Button.tsx';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ImagesSelectCard from '@/components/create/ImagesSelectCard.tsx';

type Inputs = {
  allPods: boolean;

  images: File[];

  title: string;
  price: number;
  description: string;
  location: string;
};

const CreateListing = () => {
  const [pods, setPods] = useState<Set<string>>(new Set());

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const handlePodToggle = (podId: string) => {
    const newPods = new Set(pods);
    if (pods.has(podId)) {
      newPods.delete(podId);
    } else {
      newPods.add(podId);
    }
    setPods(newPods);
  };

  console.log(Object.values(errors)[0]);

  return (
    <form className={'contents'} onSubmit={handleSubmit(onSubmit)}>
      <Card className={'mt-layout p-layout'}>
        <h2 className={'text-2xl'}>1. Select Pods</h2>
        <p>Only these selected pods will be able to see your listing.</p>

        <div className={'mt-2 flex flex-col gap-3'}>
          <label className={'flex items-center'}>
            <input
              type={'checkbox'}
              className={'mr-2'}
              {...register('allPods')}
            />
            All Pods
          </label>

          {!watch('allPods') &&
            [0, 1, 2].map((i) => (
              <label className={'flex items-center'} key={i}>
                <input
                  type={'checkbox'}
                  className={'mr-2'}
                  checked={pods.has(`${i}`)}
                  onChange={() => handlePodToggle(`${i}`)}
                />
                <div className={'mr-2 h-8 w-8 rounded-full bg-img'} />
                {i}th Pod
              </label>
            ))}
        </div>
      </Card>

      <Card className={'mt-layout p-layout'}>
        <h2 className={'text-2xl'}>2. Listing Information</h2>
        <p>Let people know what you're trying to sell!</p>

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
            <p className={'text-sm text-red-300'}>{errors.description?.message}</p>
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
      </Card>

      <Card className={'mt-layout bg-transparent p-0'}>
        <Button
          className={
            'heading h-[4rem] w-full items-center justify-center text-2xl'
          }
        >
          3. Create!
        </Button>
      </Card>
    </form>
  );
};

export default CreateListing;
