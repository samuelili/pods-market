import { BaseHTMLAttributes } from 'react';
import Avatar from '@/components/general/Avatar.tsx';

export type PosterWidgetProps = BaseHTMLAttributes<HTMLDivElement> & {
  path: string | null;
  sellerName: string;
  podName: string;
};

const PosterWidget = ({
  path,
  sellerName,
  podName,
  className,
  ...props
}: PosterWidgetProps) => (
  <div className={'flex items-center gap-2 ' + className} {...props}>
    <Avatar path={path} name={sellerName} />
    <div>
      <p className={'leading-tight'}>{sellerName}</p>
      <p className={'text-xs text-secondary-text'}>{podName}</p>
    </div>
  </div>
);

export default PosterWidget;
