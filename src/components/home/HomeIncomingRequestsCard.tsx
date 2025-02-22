import Card from '@/components/card/Card.tsx';
import queries from '@/logic/queries.ts';
import { useQuery } from '@tanstack/react-query';
import IncomingRequestCard from '@/components/requests/IncomingRequestCard.tsx';
import {useMemo} from "react";
import useCurrentUser from "@/logic/hooks/useCurrentUser.ts";

const HomeIncomingRequestsCard = () => {
  const [currentUser] = useCurrentUser();
  const { data: requests, isFetched } = useQuery(queries.requests.all);

  const incomingRequests = useMemo(() => {
    return requests?.filter(r => r.receiverId === currentUser.uid);
  }, [requests]);

  // hide if no data to show
  if (incomingRequests !== undefined && incomingRequests.length === 0) {
    return null;
  }

  return (
    <Card className={'flex-shrink p-4'}>
      <h1 className={'text-2xl'}>Recent Incoming Requests</h1>
      <p className={'text-sm'}>Who has wanted to buy from you?</p>

      <div className={'mt-layout flex flex-col gap-2'}>
        {incomingRequests &&
          isFetched &&
          incomingRequests.map((request) => (
            <IncomingRequestCard request={request} key={request.uid} />
          ))}
      </div>
    </Card>
  );
};

export default HomeIncomingRequestsCard;
