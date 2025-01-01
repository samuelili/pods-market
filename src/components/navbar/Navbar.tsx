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
import {getInitials} from "@/logic/misc.ts";

const Navbar = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLDivElement>) => {
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
          <Tooltip placement={'right'} offset={16}>
            <TooltipTrigger asChild={true}>
              <LinkButton
                to={'/pods/$podId'}
                params={{
                  podId: pod.uid,
                }}
                className={
                  'flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-img'
                }
              >{getInitials(pod.name)}</LinkButton>
            </TooltipTrigger>
            <TooltipContent>{pod.name}</TooltipContent>
          </Tooltip>
        ))}
    </div>
  );
};

export default Navbar;
