import Card from '@/components/card/Card.tsx';
import queries from '@/logic/queries.ts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import useCurrentUser from '@/logic/hooks/useCurrentUser.ts';
import PendingRequestCard from '@/components/requests/PendingRequestCard.tsx';

const RecentRequestsCard = () => {
  const [currentUser] = useCurrentUser();
  const { data: requests, isFetched } = useQuery(queries.requests.all);

  const pendingRequests = useMemo(() => {
    return requests?.filter((r) => r.senderId === currentUser.uid);
  }, [requests]);

  // hide if no data to show
  if (pendingRequests !== undefined && pendingRequests.length === 0) {
    return null;
  }

  return (
    <Card className={'flex-shrink p-4'}>
      <h1 className={'text-2xl'}>Pending Sent Requests</h1>
      <p className={'text-sm'}>Who have you reached out to?</p>

      <div className={'mt-layout flex flex-col gap-2'}>
        {pendingRequests &&
          isFetched &&
          pendingRequests.map((request) => (
            <PendingRequestCard request={request} key={request.uid} />
          ))}
      </div>
    </Card>
  );
};

export default RecentRequestsCard;
