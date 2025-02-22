import Card from '@/components/card/Card.tsx';
import { denyRequest, Request } from '@/logic/store/requests.ts';
import queries from '@/logic/queries.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FirebaseImage from '@/components/general/FirebaseImage.tsx';
import Avatar from '@/components/general/Avatar.tsx';
import Button from '@/components/buttons/Button.tsx';
import { IconCheck, IconMessage, IconX } from '@tabler/icons-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/tooltip/Tooltip.tsx';
import Loading from '@/components/general/Loading.tsx';

const IncomingRequestCard = ({ request }: { request: Request }) => {
  const { data: listing } = useQuery(
    queries.listings.listing(request.listingId),
  );
  const { data: sender } = useQuery(queries.users.user(request.senderId));

  const queryClient = useQueryClient();
  // deny mutation
  const { mutate: mutateDenyRequest, isPending: denyRequestPending } =
    useMutation({
      mutationKey: ['denyIncomingRequest', request.uid],
      async mutationFn() {
        await denyRequest(request.uid);
      },
      async onSuccess() {
        await queryClient.invalidateQueries({
          queryKey: queries.requests._def,
        });
      },
    });
  // accept mutation
  const { mutate: mutateAcceptRequest, isPending: acceptRequestPending } =
    useMutation({
      mutationKey: ['acceptIncomingRequest', request.uid],
      async mutationFn() {
        await denyRequest(request.uid);
      },
      async onSuccess() {
        await queryClient.invalidateQueries({
          queryKey: queries.requests._def,
        });
      },
    });

  return (
    <Card
      className={'flex flex-col justify-between gap-2 p-2'}
      key={request.uid}
    >
      <div>
        <div className={'flex items-center gap-2'}>
          <FirebaseImage
            path={listing?.imageUrls[0]}
            className={'h-16 w-16 rounded-md'}
          />
          <div>
            <h3 className={'text-lg'}>{listing?.title}</h3>
            <h4 className={'text-sm'}>${listing?.price}</h4>
          </div>
        </div>
        <p className={'mt-2'}>
          <IconMessage className={'inline'} size={20} /> {request.message}
        </p>
        <div className={'mt-1 flex items-center gap-1.5 text-sm'}>
          <Avatar name={sender?.name} path={sender?.avatar} size={6} />
          {sender?.name}
        </div>
      </div>
      <div className={'flex gap-2'}>
        <Tooltip>
          <TooltipTrigger asChild={true}>
            <Button
              className={'flex-1'}
              type={'button'}
              disabled={denyRequestPending}
              onClick={() => mutateDenyRequest()}
            >
              {denyRequestPending ? <Loading /> : <IconX />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Deny</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild={true}>
            <Button
              className={'flex-1'}
              type={'button'}
              disabled={acceptRequestPending}
              onClick={() => mutateAcceptRequest()}
            >
              {acceptRequestPending ? <Loading /> : <IconCheck />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Accept</TooltipContent>
        </Tooltip>
      </div>
    </Card>
  );
};

export default IncomingRequestCard;
