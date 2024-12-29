import Card from '@/components/card/Card.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/buttons/Button.tsx';
import { useCallback, useState } from 'react';
import Loading from '@/components/general/Loading.tsx';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { createUser, login } from '@/logic/auth.ts';

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [createAccountMode, setCreateAccountMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const searchParams = useSearch({
    from: '/login',
  });

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async ({ email, password }) => {
      setLoading(true);
      setError(null);

      try {
        await (createAccountMode
          ? createUser(email, password)
          : login(email, password));

        await navigate({ to: searchParams.redirect ?? '/' });
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError((e as any).toString());
        }
        console.error(e);
      }

      setLoading(false);
    },
    [createAccountMode, searchParams.redirect],
  );

  return (
    <div className={'mx-auto mt-16 max-w-lg'}>
      <Card className={'p-layout'}>
        <h1 className={'text-center text-4xl'}>Pods Market</h1>
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
              <Button className={'heading w-full'} large={true} type={'submit'}>
                {loading ? <Loading /> : 'Log in'}
              </Button>
              <p>Or</p>
              <Button
                className={'text-sm'}
                type={'button'}
                onClick={() => setCreateAccountMode(true)}
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
                onClick={() => setCreateAccountMode(false)}
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
