import Card from '@/components/card/Card.tsx';
import Button from '@/components/buttons/Button.tsx';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import AvatarImageSelectCard from '@/components/create/AvatarImageSelectCard.tsx';
import { useCallback, useState } from 'react';
import { createPod, NewPod } from '@/logic/store/pods.ts';
import { setUser, user } from '@/logic/auth.ts';
import { useNavigate } from '@tanstack/react-router';
import Loading from '@/components/general/Loading.tsx';
import { addPodToUser } from '@/logic/store/users.ts';

type Inputs = {
  allPods: boolean;

  image: File;

  name: string;
  price: number;
  description: string;
  location: string;
};

const CreatePod = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = useCallback(async (data) => {
    setLoading(true);

    const newPod: NewPod = {
      name: data.name,
      description: data.description,
      socials: [],
      users: [user!.uid],
      moderators: [user!.uid],
    };

    const pod = await createPod(newPod);
    setUser(await addPodToUser(user!.uid, pod.uid));

    await navigate({
      to: '/pods/$podId',
      params: {
        podId: pod.uid,
      },
    });

    setLoading(false);
  }, [user, navigate]);

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
          {loading ? <Loading /> : '2. Create!'}
        </Button>
      </Card>
    </form>
  );
};

export default CreatePod;
