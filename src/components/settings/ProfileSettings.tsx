import Avatar from "@/components/general/Avatar.tsx";
import Button from "@/components/buttons/Button.tsx";
import {IconPencil} from "@tabler/icons-react";
import Loading from "@/components/general/Loading.tsx";
import Card from "@/components/card/Card.tsx";
import {useNavigate} from "@tanstack/react-router";
import useCurrentUser from "@/logic/hooks/useCurrentUser.ts";
import {useCallback, useState} from "react";
import {logout} from "@/logic/auth.ts";
import EditProfile from "@/components/settings/EditProfile.tsx";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [user] = useCurrentUser();

  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<null | string>();

  const [editingProfile, setEditingProfile] = useState(false);

  const handleLogOut = useCallback(async () => {
    try {
      setLogoutError(null);
      setLoggingOut(true);

      await logout();

      await navigate({
        to: '/login',
      });
    } catch (e) {
      if (e instanceof Error) {
        setLogoutError(e.message);
      } else {
        setLoggingOut((e as any).toString());
      }
    }

    setLoggingOut(false);
  }, [navigate]);

  return (
    <Card className={'w-fit p-layout'}>
      {!editingProfile ? (
        <>
          <div className={'flex flex-wrap items-center gap-layout'}>
            <Avatar
              size={16}
              name={user.name}
              path={user.avatar}
              className={'text-2xl'}
            />
            <h1 className={'text-2xl'}>Hello, {user.name}</h1>
          </div>
          <div className={"mt-layout flex gap-layout flex-wrap"}>
            <Button onClick={() => setEditingProfile(true)}>
              <IconPencil />
              Edit
            </Button>
            <Button onClick={() => !loggingOut && handleLogOut()}>
              {loggingOut ? <Loading /> : 'Sign Out'}
            </Button>
          </div>
          {logoutError && (
            <p className={'mt-2 text-sm text-red-300'}>{logoutError}</p>
          )}</>
      ) : <EditProfile handleClose={() => setEditingProfile(false)}/>}
    </Card>
  )
}

export default ProfileSettings;