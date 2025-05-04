import { BaseHTMLAttributes } from 'react';
import {
  IconBuildingStore,
  IconHome,
  IconPlus,
  IconSettings,
} from '@tabler/icons-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/tooltip/Tooltip.tsx';
import LinkButton from '@/components/buttons/LinkButton.tsx';
import { useQuery } from '@tanstack/react-query';
import queries from '@/logic/queries.ts';
import { useParams } from '@tanstack/react-router';
import Avatar from '@/components/general/Avatar.tsx';

const Navbar = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLDivElement>) => {
  const params = useParams({
    strict: false,
  });
  const { data: pods } = useQuery(queries.pods.all);

  return (
    <div className={' ' + className} {...props}>
      <Tooltip placement={'right'} offset={16}>
        <TooltipTrigger asChild={true}>
          <LinkButton
            className={
              'flex h-[3rem] w-[3rem] items-center justify-center rounded-md bg-img'
            }
            to={'/'}
          >
            <IconHome />
          </LinkButton>
        </TooltipTrigger>
        <TooltipContent>Home</TooltipContent>
      </Tooltip>

      <Tooltip placement={'right'} offset={16}>
        <TooltipTrigger asChild={true}>
          <LinkButton
            className={
              'flex h-[3rem] w-[3rem] items-center justify-center rounded-md bg-img'
            }
            to={'/create'}
          >
            <IconPlus />
          </LinkButton>
        </TooltipTrigger>
        <TooltipContent>Create</TooltipContent>
      </Tooltip>

      <Tooltip placement={'right'} offset={16}>
        <TooltipTrigger asChild={true}>
          <LinkButton
            className={
              'flex h-[3rem] w-[3rem] items-center justify-center rounded-md bg-img'
            }
            to={'/settings'}
          >
            <IconSettings />
          </LinkButton>
        </TooltipTrigger>
        <TooltipContent>Settings</TooltipContent>
      </Tooltip>

      <hr />
      <Tooltip placement={'right'} offset={16}>
        <TooltipTrigger asChild={true}>
          <LinkButton
            to={'/pods/all'}
            className={
              'flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-img'
            }
          >
            <IconBuildingStore />
          </LinkButton>
        </TooltipTrigger>
        <TooltipContent>All Pods</TooltipContent>
      </Tooltip>

      {pods &&
        pods.map((pod) => (
          <Tooltip placement={'right'} offset={16} key={pod.uid}>
            <TooltipTrigger asChild={true}>
              <LinkButton
                selected={params.podId === pod.uid}
                to={'/pods/$podId'}
                params={{
                  podId: pod.uid,
                }}
                className={
                  'flex h-[3rem] w-[3rem] items-center justify-center rounded-full p-0 bg-transparent'
                }
              >
                {/*{pod.photoUrl ? (*/}
                {/*  <FirebaseImage path={pod.photoUrl} className={"w-[3rem] h-[3rem] object-cover"} />*/}
                {/*) : (*/}
                {/*  getInitials(pod.name)*/}
                {/*)}*/}
                <Avatar size={12} name={pod.name} path={pod.photoUrl} />
              </LinkButton>
            </TooltipTrigger>
            <TooltipContent>{pod.name}</TooltipContent>
          </Tooltip>
        ))}
    </div>
  );
};

export default Navbar;
