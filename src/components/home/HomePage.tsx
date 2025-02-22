import Card from '@/components/card/Card.tsx';
import useCurrentUser from '@/logic/hooks/useCurrentUser.ts';
import HomeIncomingRequestsCard from "@/components/home/HomeIncomingRequestsCard.tsx";
import HomePendingRequestsCard from "@/components/home/HomePendingRequestsCard.tsx";

const HomePage = () => {
  const [user] = useCurrentUser();

  return (
    <>
      <Card className={'py-layout px-6 mx-auto w-fit'}>
        <h1 className={'text-2xl'}>Welcome, {user.name}</h1>
      </Card>
      <div className={'flex flex-wrap gap-layout'}>
        <HomeIncomingRequestsCard/>
        <HomePendingRequestsCard/>
      </div>
    </>
  );
};

export default HomePage;
