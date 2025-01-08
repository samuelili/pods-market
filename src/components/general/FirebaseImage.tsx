import { ImgHTMLAttributes, useEffect, useState } from 'react';
import { getStorageUrl } from '@/logic/storage.ts';

export type FirebaseImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src'
> & {
  path: string;
};

const cache = new Map<string, string>();

const FirebaseImage = ({ path, alt = '', style, ...props }: FirebaseImageProps) => {
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!cache.has(path)) {
      setSrc(undefined);
      getStorageUrl(path).then((url) => {
        cache.set(path, url);
        setSrc(url);
      });
    } else {
      setSrc(cache.get(path)!);
    }
  }, [path]);

  return <img src={src} alt={alt} style={{
    opacity: src === undefined ? 0 : 1,
  }} {...props} />;
};

export default FirebaseImage;
