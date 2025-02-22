import { IconMessage } from '@tabler/icons-react';
import Button from '@/components/buttons/Button.tsx';
import { useMutation } from '@tanstack/react-query';
import Loading from '@/components/general/Loading.tsx';
import useCurrentUser from '@/logic/hooks/useCurrentUser.ts';
import { Listing } from '@/logic/store/listings.ts';
import { createRequest, NewRequest } from '@/logic/store/requests.ts';

const ListingSendRequest = ({ listing }: { listing: Listing }) => {
  const [currentUser] = useCurrentUser();
  const sendRequestMutation = useMutation({
    mutationFn: async () => {
      const newRequest: NewRequest = {
        senderId: currentUser.uid,
        receiverId: listing.userId,
        listingId: listing.uid,
        timestamp: Date.now(),
        message: 'foo bar hee har',
        accepted: false,
      };

      const request = await createRequest(newRequest);
      console.log('request sent!', request);
    },
  });

  return (
    <Button
      className={'mt-4 w-full justify-center py-3 text-center'}
      onClick={() => sendRequestMutation.mutate()}
    >
      {sendRequestMutation.isPending ? <Loading /> : <IconMessage />} Contact
    </Button>
  );
};

export default ListingSendRequest;
