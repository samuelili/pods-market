import Card from '@/components/card/Card.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/buttons/Button.tsx';
import { useCallback, useState } from 'react';
import Loading from '@/components/general/Loading.tsx';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  createUserWithEmailPassword,
  loginWithEmailAndPassword,
  loginWithGoogle,
} from '@/logic/auth.ts';
import { addUserToPod } from '@/logic/store/pods.ts';
import { useQueryClient } from '@tanstack/react-query';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { User } from '@/types/User.ts';

type Inputs = {
  email: string;
  password: string;
};

export type LoginTypes = 'email-password' | 'google';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [createAccountMode, setcreateAccountMode] = useState(false);
  const [loading, setLoading] = useState<LoginTypes | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const searchParams = useSearch({
    from: '/login',
  });

  const queryClient = useQueryClient();

  const login = useCallback(
    async (
      params:
        | {
            type: 'email-password';
            email: string;
            password: string;
          }
        | {
            type: 'google';
          },
    ) => {
      setLoading(params.type);
      setError(null);

      try {
        let user: User | null | undefined;
        if (params.type === 'google') {
          user = await loginWithGoogle();
        } else {
          if (createAccountMode) {
            user = await createUserWithEmailPassword(
              params.email,
              params.password,
            );
          } else {
            user = await loginWithEmailAndPassword(
              params.email,
              params.password,
            );
          }
        }

        if (!user) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error('Unable to create User. Contact Sam.');
        }

        if (searchParams?.join) {
          // if from a join
          console.log('attempting to join pod');
          await addUserToPod(searchParams.join, user!.uid);
          console.log('pod joined');
          await navigate({
            to: '/pods/$podId',
            params: {
              podId: searchParams.join,
            },
          });
        } else {
          // just redirect normally
          await navigate({ to: searchParams?.redirect ?? '/' });
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError((e as any).toString());
        }
        console.error(e);
      }

      setLoading(null);
    },
    [navigate, createAccountMode, searchParams, queryClient],
  );

  const onSubmit: SubmitHandler<Inputs> = useCallback(({ email, password }) => {
    return login({
      type: 'email-password',
      email,
      password,
    });
  }, []);

  return (
    <div className={'mx-auto mt-16 max-w-lg p-layout'}>
      <Card className={'p-layout'}>
        <h1 className={'text-center text-4xl'}>Buy Deez</h1>
      </Card>
      <form className={'contents'} onSubmit={handleSubmit(onSubmit)}>
        <Card className={'mt-layout p-layout'}>
          <h2 className={'text-center text-2xl'}>
            {!createAccountMode ? 'Log In' : 'Create New Account'}
          </h2>
          <label className={'flex-1'}>
            <h3 className={'text-lg'}>
              Email
              <span className={'ml-2 text-sm text-red-300'}>
                {errors.email?.message}
              </span>
            </h3>
            <input
              className={'mt-2'}
              placeholder={'john.doe@provider.com'}
              {...register('email', {
                required: 'Please provide your email',
              })}
            />
          </label>

          <label>
            <h3 className={'mt-layout text-lg'}>
              Password
              <span className={'ml-2 text-sm text-red-300'}>
                {errors.password?.message}
              </span>
            </h3>
            <input
              className={'mt-2'}
              type={'password'}
              placeholder={'psst. secret...'}
              {...register('password', {
                required: 'Please enter your password',
              })}
            />
          </label>
          {error && (
            <p className={'mt-layout text-center text-sm text-red-300'}>
              {error}
            </p>
          )}
        </Card>
        <Card className={'mt-layout flex flex-col items-center gap-2'}>
          {!createAccountMode ? (
            <>
              <Button
                className={'heading w-full'}
                large={true}
                type={'submit'}
                disabled={Boolean(loading && loading !== 'email-password')}
              >
                {loading === 'email-password' ? <Loading /> : 'Log in'}
              </Button>
              <Button
                className={'heading w-full !py-layout'}
                type={'button'}
                onClick={() =>
                  login({
                    type: 'google',
                  })
                }
                disabled={Boolean(loading && loading !== 'google')}
              >
                {loading === 'google' ? (
                  <Loading />
                ) : (
                  <>
                    <IconBrandGoogleFilled /> Log in With Google
                  </>
                )}
              </Button>
              <p>Or</p>
              <Button
                className={'text-sm'}
                type={'button'}
                onClick={() => setcreateAccountMode(true)}
              >
                Create New Account
              </Button>
            </>
          ) : (
            <>
              <Button className={'heading w-full'} large={true}>
                {loading ? <Loading /> : 'Register'}
              </Button>
              <p>Or</p>
              <Button
                className={'text-sm'}
                type={'button'}
                onClick={() => setcreateAccountMode(false)}
              >
                Return to Login
              </Button>
            </>
          )}
        </Card>
      </form>
    </div>
  );
};

export default LoginPage;
