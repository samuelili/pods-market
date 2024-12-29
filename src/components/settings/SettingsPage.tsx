import Card from '../card/Card';
import {logout, user} from '@/logic/auth.ts';
import Button from '@/components/buttons/Button.tsx';
import { useCallback, useState } from 'react';
import Loading from '@/components/general/Loading.tsx';
import {useNavigate} from "@tanstack/react-router";

const SettingsPage = () => {
  const navigate = useNavigate();

  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<null | string>();

  const handleLogOut = useCallback(async () => {
    try {
      setLogoutError(null);
      setLoggingOut(true);

      await logout();

      await navigate({to: "/login"})

      setLoggingOut(false);
    } catch (e) {
      if (e instanceof Error) {
        setLogoutError(e.message);
      } else {
        setLoggingOut((e as any).toString());
      }
    }
  }, [navigate]);

  return (
    <Card className={'p-layout'}>
      <h1 className={'text-2xl'}>Hello, {user!.name}</h1>
      <Button onClick={() => !loggingOut && handleLogOut()}>
        {loggingOut ? <Loading /> : 'Sign Out'}
      </Button>
      {logoutError && (
        <p className={'mt-2 text-sm text-red-300'}>{logoutError}</p>
      )}
    </Card>
  );
};

export default SettingsPage;
