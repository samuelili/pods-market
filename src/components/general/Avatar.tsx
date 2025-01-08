import { BaseHTMLAttributes } from 'react';
import { getInitials } from '@/logic/misc.ts';
import { twMerge } from 'tailwind-merge';
import FirebaseImage from '@/components/general/FirebaseImage.tsx';

export type AvatarProps = BaseHTMLAttributes<HTMLDivElement> & {
  size?: number;
  name?: string;
  path?: string | null;
};

const Avatar = ({
  size = 10,
  name,
  path,
  className,
  ...props
}: AvatarProps) => {
  return (
    <div
      className={twMerge(
        `flex items-center justify-center overflow-hidden rounded-full bg-img`,
        className,
      )}
      style={{
        width: size * 4,
        height: size * 4,
      }}
      {...props}
    >
      {path ? (
        <FirebaseImage className={'h-full w-full object-cover'} path={path} />
      ) : (
        name && getInitials(name)
      )}
    </div>
  );
};

export default Avatar;
