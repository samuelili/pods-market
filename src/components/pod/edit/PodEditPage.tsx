import Card from '@/components/card/Card.tsx';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import useCurrentUser from '@/logic/hooks/useCurrentUser.ts';
import { updatePod } from '@/logic/store/pods.ts';
import queries from '@/logic/queries.ts';
import AvatarImageSelectCard from '@/components/create/AvatarImageSelectCard.tsx';
import Button from '@/components/buttons/Button.tsx';
import Loading from '@/components/general/Loading.tsx';
import { IconArrowLeft } from '@tabler/icons-react';
import LinkButton from '@/components/buttons/LinkButton.tsx';
import { uploadPodImage } from '@/logic/storage.ts';
import { UploadResult } from 'firebase/storage';

type Inputs = {
  allPods: boolean;

  image?: File;

  name: string;
  description: string;
};

const routeApi = getRouteApi('/_authenticated/_shopping/pods/$podId/edit');

const PodEditPage = () => {
  const pod = routeApi.useLoaderData();

  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      allPods: false,
      image: undefined,
      name: pod?.name,
      description: pod?.description,
    },
  });
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [user] = useCurrentUser();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      if (!pod) return;

      setLoading(true);

      // first, upload files
      let uploadResult: UploadResult | null = null;
      if (data.image) uploadResult = await uploadPodImage(data.image);

      const newPod = await updatePod(pod.uid, {
        name: data.name,
        photoUrl: uploadResult?.ref.fullPath ?? undefined,
        description: data.description,
      });
      await queryClient.invalidateQueries(queries.pods.pod(newPod.uid));

      await navigate({
        to: '/pods/$podId',
        params: {
          podId: newPod.uid,
        },
      });

      setLoading(false);
    },
    [user, navigate, queryClient, pod],
  );

  if (!pod) return <Card>Something went wrong!</Card>;

  return (
    <div className={'mx-auto max-w-xl'}>
      <LinkButton to={'..'}>
        <IconArrowLeft /> Back
      </LinkButton>
      <Card className={'mt-4 p-layout'}>
        <h1 className={'text-3xl'}>Edit Pod: {pod.name}</h1>
      </Card>
      <form className={'contents'} onSubmit={handleSubmit(onSubmit)}>
        <Card className={'mt-layout p-layout'}>
          <label className={'block'}>
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
            {loading ? <Loading /> : 'Update'}
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default PodEditPage;
