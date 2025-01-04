import { ImgHTMLAttributes, useEffect, useState } from 'react';
import { getStorageUrl } from '@/logic/storage.ts';

export type FirebaseImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src'
> & {
  path: string;
};

const FirebaseImage = ({ path, alt = '', ...props }: FirebaseImageProps) => {
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    getStorageUrl(path).then((url) => setSrc(url));
  }, [path]);

  return <img src={src} alt={alt} {...props} />;
};

export default FirebaseImage;
