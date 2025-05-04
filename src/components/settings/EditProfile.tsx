import { Controller, useForm } from 'react-hook-form';
import AvatarImageSelectCard from '@/components/create/AvatarImageSelectCard.tsx';
import { useCallback, useState } from 'react';
import useCurrentUser from '@/logic/hooks/useCurrentUser.ts';
import Button from '@/components/buttons/Button.tsx';
import { IconCheck, IconX } from '@tabler/icons-react';
import Loading from '@/components/general/Loading.tsx';
import { uploadUserAvatarImage } from '@/logic/storage.ts';
import { updateUser } from '@/logic/store/users.ts';
import { User } from '@/types/User.ts';
import { useQueryClient } from '@tanstack/react-query';
import queries from '@/logic/queries.ts';

type Inputs = {
  avatar?: File;
  name: string;
  contacts: User['contacts'];
};

export type EditProfileProps = {
  handleClose?: () => void;
};

const EditProfile = ({ handleClose }: EditProfileProps) => {
  const queryClient = useQueryClient();

  const [currentUser] = useCurrentUser();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: currentUser.name,
      contacts: currentUser.contacts,
    },
  });
  const [loading, setLoading] = useState(false);
  const editProfile = useCallback(
    async (data: Inputs) => {
      setLoading(true);

      const update: Partial<User> = {
        name: data.name,
      };

      if (data.avatar) {
        const result = await uploadUserAvatarImage(data.avatar);
        update.avatar = result.ref.fullPath;
      }

      await updateUser(currentUser.uid, update);
      await queryClient.invalidateQueries(queries.users.current);

      setLoading(false);

      handleClose && handleClose();
    },
    [currentUser, handleClose],
  );

  return (
    <form className={'contents'} onSubmit={handleSubmit(editProfile)}>
      <h3 className={'text-lg'}>
        Upload Photo{' '}
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

      <div className="mt-layout flex items-center justify-end gap-2">
        <Button type={'button'} onClick={handleClose}>
          <IconX />
          Cancel
        </Button>
        <Button type={'submit'}>
          {loading ? <Loading /> : <IconCheck />}
          Save
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;
