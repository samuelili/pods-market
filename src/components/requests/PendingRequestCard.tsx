import Card from '@/components/card/Card.tsx';
import { cancelSentRequest, Request } from '@/logic/store/requests.ts';
import queries from '@/logic/queries.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FirebaseImage from '@/components/general/FirebaseImage.tsx';
import Avatar from '@/components/general/Avatar.tsx';
import Button from '@/components/buttons/Button.tsx';
import { IconMessage, IconX } from '@tabler/icons-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/tooltip/Tooltip.tsx';
import Loading from "@/components/general/Loading.tsx";

const IncomingRequestCard = ({ request }: { request: Request }) => {
  const { data: listing } = useQuery(
    queries.listings.listing(request.listingId),
  );
  const { data: receiver } = useQuery(queries.users.user(request.receiverId));

  const queryClient = useQueryClient();
  // deny mutation
  const { mutate: mutateCancelRequest, isPending: cancelRequestPending } =
    useMutation({
      mutationKey: ['cancelPendingRequest', request.uid],
      async mutationFn() {
        await cancelSentRequest(request.uid);
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

        <div className={'mt-2 flex items-center gap-1.5 text-sm'}>
          <Avatar name={receiver?.name} path={receiver?.avatar} size={6} />
          {receiver?.name}
        </div>

        <p className={'mt-1'}>
          <IconMessage className={'inline'} size={20} /> {request.message}
        </p>
      </div>
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <Button
            className={'flex-1'}
            type={'button'}
            onClick={() => mutateCancelRequest()}
            disabled={cancelRequestPending}
          >
            {cancelRequestPending ? <Loading /> : <IconX />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Cancel</TooltipContent>
      </Tooltip>
    </Card>
  );
};

export default IncomingRequestCard;
