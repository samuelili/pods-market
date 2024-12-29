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

const Navbar = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLDivElement>) => {
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

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Tooltip placement={'right'} offset={16}>
          <TooltipTrigger asChild={true}>
            <LinkButton
              to={'/pods/$podId'}
              params={{
                podId: 'asdf',
              }}
              className={
                'flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-img'
              }
            ></LinkButton>
          </TooltipTrigger>
          <TooltipContent>{i}th Pod</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default Navbar;
