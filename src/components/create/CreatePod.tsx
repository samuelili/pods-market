import Card from '@/components/card/Card.tsx';
import Button from '@/components/buttons/Button.tsx';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import AvatarImageSelectCard from '@/components/create/AvatarImageSelectCard.tsx';

type Inputs = {
  allPods: boolean;

  image: File;

  name: string;
  price: number;
  description: string;
  location: string;
};

const CreatePod = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form className={'contents'} onSubmit={handleSubmit(onSubmit)}>
      <Card className={'mt-layout p-layout'}>
        <h2 className={'text-2xl'}>1. Describe Your Pod</h2>
        <p>Let people now what your pod is about!</p>

        <label className={'mt-4 block'}>
          <h3 className={'text-lg'}>
            Pod Name
            <p className={'text-sm text-red-300'}>{errors.name?.message}</p>
          </h3>
          <input
            className={'mt-2'}
            placeholder={'Joke-sters'}
            {...register('name', {
              required: 'Please provide a name',
            })}
          />
        </label>

        <h3 className={'mt-4 text-lg'}>
          Upload Photo{' '}
          <p className={'text-sm text-red-300'}>{errors.image?.message}</p>
        </h3>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <AvatarImageSelectCard
              file={value}
              onFileChange={onChange}
              className={'mt-2'}
            />
          )}
          name={'image'}
        />

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
      </Card>

      <Card className={'mt-layout bg-transparent p-0'}>
        <Button
          className={
            'heading h-[4rem] w-full items-center justify-center text-2xl'
          }
        >
          2. Create!
        </Button>
      </Card>
    </form>
  );
};

export default CreatePod;
