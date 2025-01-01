import Card from '@/components/card/Card.tsx';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import queries from '@/logic/queries.ts';
import { getInitials } from '@/logic/misc.ts';
import Button from '@/components/buttons/Button.tsx';
import { useCallback, useEffect, useState } from 'react';
import { userId, userIdPromise } from '@/logic/auth.ts';
import { addUserToPod } from '@/logic/store/pods.ts';

const JoinPodPage = () => {
  const navigate = useNavigate();
  const params = useParams({ from: '/join/$podId' });
  const { data: pod } = useQuery(queries.pods.pod(params.podId));

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    (async () => {
      await userIdPromise;
      setIsAuthenticated(userId !== '');
    })();
  }, []);

  const handleJoin = useCallback(async () => {
    if (!pod) return;

    if (isAuthenticated) {
      await addUserToPod(pod.uid, userId);

      await navigate({
        to: '/pods/$podId',
        params: {
          podId: pod.uid,
        },
      });
    } else {
      await navigate({
        to: '/login',
        search: {
          join: pod.uid,
        },
      });
    }
  }, [navigate, pod]);

  if (!pod || isAuthenticated === null) return null;

  return (
    <div className={'flex min-h-screen items-center justify-center p-layout'}>
      <Card className={'max-w-sm p-layout text-center'}>
        <p className={'text-lg'}>You Have Been Invited To</p>
        <div
          className={
            'mt-layout flex items-center justify-center gap-layout text-center text-2xl'
          }
        >
          <div
            className={
              'flex h-24 w-24 min-w-24 items-center justify-center rounded-full bg-img'
            }
          >
            {getInitials(pod?.name)}
          </div>
          <h1>{pod?.name}</h1>
        </div>
        <Button className={'mt-4 px-12'} large={true} onClick={handleJoin}>
          {isAuthenticated ? 'Join' : 'Login & Join'}
        </Button>
      </Card>
    </div>
  );
};

export default JoinPodPage;
