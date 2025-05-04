import Card from '@/components/card/Card.tsx';
import useCurrentUser from '@/logic/hooks/useCurrentUser.ts';
import LinkButton from '@/components/buttons/LinkButton.tsx';
import { IconBuildingStore, IconFileInvoice } from '@tabler/icons-react';

const HomePage = () => {
  const [user] = useCurrentUser();

  return (
    <>
      <Card className={'mx-auto w-fit px-6 py-layout'}>
        <h1 className={'text-2xl'}>Welcome, {user.name}</h1>
      </Card>
      <div className={'mx-auto mt-layout flex max-w-lg flex-wrap gap-layout'}>
        <Card className={'p-layout w-full'}>
          <h2 className={'text-xl'}>What would you like to do?</h2>
          <div className={'mt-layout flex flex-wrap gap-layout'}>
            <LinkButton className={'p-4 flex-1'} to={"/create/listing"}>
              <IconFileInvoice />
              Create Listing
            </LinkButton>
            <LinkButton className={'p-4 flex-1'} to={"/pods/all"}>
              <IconBuildingStore />
              View All Listings
            </LinkButton>
          </div>
        </Card>
      </div>
    </>
  );
};

export default HomePage;
