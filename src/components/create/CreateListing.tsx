import Card from '@/components/card/Card.tsx';
import Button from '@/components/buttons/Button.tsx';

const CreateListing = () => {
  return (
    <>
      <Card className={'mt-layout p-layout'}>
        <h3 className={'text-lg'}>Select Pods</h3>

        <div className={'mt-2 flex flex-col gap-3'}>
          <label className={'flex items-center'}>
            <input type={'checkbox'} className={'mr-2'} />
            All Pods
          </label>

          {[0, 1, 2].map((i) => (
            <label className={'flex items-center'} key={i}>
              <input type={'checkbox'} className={'mr-2'} checked={false} />
              <div className={'mr-2 h-8 w-8 rounded-full bg-img'} />
              {i}th Pod
            </label>
          ))}
        </div>
      </Card>

      <Card className={'mt-layout p-layout'}>
        <h3 className={'text-lg'}>Upload Images</h3>
        <div className={'mt-2 h-[12rem] w-full rounded-lg bg-img'} />

        <div className={'mt-layout flex gap-layout'}>
          <label className={'flex-1'}>
            <h3 className={'text-lg'}>Listing Title</h3>
            <input className={'mt-2'} placeholder={'Djungelskog'} />
          </label>

          <label>
            <h3 className={'text-lg'}>Price</h3>
            <input className={'mt-2'} placeholder={'$$$'} />
          </label>
        </div>

        <label className={'mt-layout block'}>
          <h3 className={'text-lg'}>Description</h3>
          <input
            className={'mt-2'}
            placeholder={'Lorem ipsum dolor sit amet...'}
          />
        </label>

        <label className={'mt-layout block'}>
          <h3 className={'text-lg'}>Location</h3>
          <input className={'mt-2'} placeholder={'Davis, CA'} />
        </label>
      </Card>

      <Card className={"mt-layout bg-transparent p-0"}>
        <Button className={'h-[4rem] w-full items-center justify-center'}>Create!</Button>
      </Card>
    </>
  );
};

export default CreateListing;
