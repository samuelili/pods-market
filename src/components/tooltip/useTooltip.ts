import {
  autoUpdate,
  flip,
  offset,
  type Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import { useMemo, useState } from 'react';

export interface TooltipOptions {
  initialOpen?: boolean;

  placement?: Placement;
  offset?: number;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useTooltip({
  initialOpen = false,
  placement = 'top',
  offset: propOffset = 4,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: TooltipOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(propOffset),
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'start',
        padding: 5,
      }),
      shift({ padding: 16 }),
    ],
  });

  const context = data.context;

  const hover = useHover(context, {
    move: false,
    enabled: controlledOpen == null,
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: {
      open: 120,
      close: 220,
    },
    initial: {
      transform: 'translateX(-0.25rem) scale(0.95)',
      opacity: 0,
    },
    close: {
      transform: 'translateX(-0.5rem) scale(0.9)',
      opacity: 0,
    },
  });

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      isMounted,
      transitionStyles,
    }),
    [open, setOpen, interactions, data, isMounted, transitionStyles],
  );
}
