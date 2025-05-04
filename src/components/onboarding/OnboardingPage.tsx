import Card from '@/components/card/Card.tsx';
import { Controller, useForm } from 'react-hook-form';
import AvatarImageSelectCard from '@/components/create/AvatarImageSelectCard.tsx';
import Button from '@/components/buttons/Button.tsx';
import Loading from '@/components/general/Loading.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCurrentUser from '@/logic/hooks/useCurrentUser.ts';
import { User } from '@/types/User.ts';
import { uploadUserAvatarImage } from '@/logic/storage.ts';
import { updateUser } from '@/logic/store/users.ts';
import queries from '@/logic/queries.ts';
import { getRouteApi } from '@tanstack/react-router';

type Inputs = {
  avatar?: File;
  name: string;
};

const route = getRouteApi('/onboarding');

const OnboardingPage = () => {
  const queryClient = useQueryClient();
  const navigate = route.useNavigate();
  const search = route.useSearch();

  const [currentUser] = useCurrentUser();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({});
  const { mutate: editProfile, isPending: loading } = useMutation({
    mutationKey: ['onboarding'],
    async mutationFn(data: Inputs) {
      // setLoading(true);

      const update: Partial<User> = {
        name: data.name,
      };

      if (data.avatar) {
        const result = await uploadUserAvatarImage(data.avatar);
        update.avatar = result.ref.fullPath;
      }

      await updateUser(currentUser.uid, update);
      await queryClient.invalidateQueries(queries.users.current);

      await navigate({
        to: search?.redirect ?? '/',
      });
    },
  });
  return (
    <div className={'mx-auto mt-16 max-w-xl p-layout'}>
      <Card className={'p-layout'}>
        <h1 className={'text-center text-4xl'}>Welcome New User!</h1>
        <p>Before we get started, we need a bit more information from you.</p>
      </Card>

      {/*@ts-ignore*/}
      <form className={'contents'} onSubmit={handleSubmit(editProfile)}>
        <Card className={'mt-layout p-layout'}>
          <h3 className={'text-lg'}>
            Upload Photo (Optional){' '}
            <p className={'text-sm text-red-300'}>{errors.avatar?.message}</p>
          </h3>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <AvatarImageSelectCard
                file={value}
                onFileChange={onChange}
                className={'mt-2'}
                currentAvatar={currentUser.avatar}
              />
            )}
            name={'avatar'}
          />
          <h3 className={'mt-4 text-lg'}>
            Name
            <p className={'text-sm text-red-300'}>{errors.name?.message}</p>
          </h3>
          <input
            className={'mt-2'}
            placeholder={"What's your name?"}
            {...register('name', {
              required: 'Please provide a name',
            })}
          />

          {/*<h3 className={'mt-layout text-lg'}>Contact Information</h3>*/}
          {/*<Controller*/}
          {/*  control={control}*/}
          {/*  render={({ field: { onChange, value } }) => (*/}
          {/*    <ContactInformationEdit*/}
          {/*      value={value}*/}
          {/*      onChange={onChange}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*  name={'contacts'}*/}
          {/*/>*/}
        </Card>

        <Card className={'mt-layout bg-transparent p-0'}>
          <Button
            type={'submit'}
            className={
              'heading h-[4rem] w-full items-center justify-center text-2xl'
            }
          >
            {loading ? <Loading /> : `Continue`}
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default OnboardingPage;
