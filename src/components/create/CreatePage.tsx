import Card from '@/components/card/Card.tsx';
import { IconBlob, IconFileInvoice } from '@tabler/icons-react';
import LinkButton from '@/components/buttons/LinkButton.tsx';
import { Outlet, useMatchRoute } from '@tanstack/react-router';

const CreatePage = () => {
  const matchRoute = useMatchRoute();

  return (
    <>
      <div className={'mx-auto max-w-xl'}>
        <Card className={'mx-auto p-4'}>
          <h1 className={'text-2xl'}>What Would You Like To Create?</h1>
          <div className={'mt-layout flex h-[4rem] gap-2'}>
            <LinkButton
              to={'/create/listing'}
              className={'flex-1 items-center justify-center'}
              selected={matchRoute({ to: '/create/listing' }) !== false}
            >
              <IconFileInvoice />
              Listing
            </LinkButton>
            <LinkButton
              to={'/create/pod'}
              className={'flex-1 items-center justify-center'}
              selected={matchRoute({ to: '/create/pod' }) !== false}
            >
              <IconBlob /> Pod
            </LinkButton>
          </div>
        </Card>

        <Outlet />
      </div>
    </>
  );
};

export default CreatePage;
