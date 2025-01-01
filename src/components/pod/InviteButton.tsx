import { IconCopy, IconUserPlus } from '@tabler/icons-react';
import Button from '@/components/buttons/Button.tsx';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Card from '@/components/card/Card.tsx';
import { useParams } from '@tanstack/react-router';
import { twMerge } from 'tailwind-merge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/tooltip/Tooltip.tsx';
import { useState } from 'react';

const InviteButton = () => {
  const params = useParams({
    from: '/_authenticated/pods/$podId',
  });

  const link = `${window.location.origin}/join/${params.podId}`;

  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 1000);
  };

  return (
    <Popover>
      <PopoverButton as={Button} className={'!p-2'}>
        <IconUserPlus />
      </PopoverButton>
      <PopoverPanel
        as={Card}
        anchor="bottom end"
        transition
        className={twMerge(
          'p-1 transition duration-200 [--anchor-gap:0.25rem]',
          'data-[closed]:-translate-y-2 data-[closed]:scale-95 data-[closed]:opacity-0',
        )}
      >
        <p className={'mt-1 pl-2.5'}>
          Copy the link below and share to your friends!
        </p>
        <Tooltip open={showCopiedMessage} placement={'bottom'}>
          <TooltipTrigger>
            <Button className={'mt-2 gap-2 pr-1.5'} onClick={handleCopy}>
              {link}
              <IconCopy />
            </Button>
          </TooltipTrigger>
          <TooltipContent className={"px-2 bg-img"}>Copied!</TooltipContent>
        </Tooltip>
      </PopoverPanel>
    </Popover>
  );
};

export default InviteButton;
