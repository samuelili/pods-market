import { BaseHTMLAttributes } from 'react';

export type PosterWidgetProps = BaseHTMLAttributes<HTMLDivElement> & {
  src: string;
  sellerName: string;
  podName: string;
};

const PosterWidget = ({
  src,
  sellerName,
  podName,
  className,
  ...props
}: PosterWidgetProps) => (
  <div className={'flex items-center gap-2 ' + className} {...props}>
    <div className={'h-10 w-10 rounded-full bg-img'} />
    <div>
      <p className={'leading-tight'}>{sellerName}</p>
      <p className={'text-xs text-secondary-text'}>{podName}</p>
    </div>
  </div>
);

export default PosterWidget;
