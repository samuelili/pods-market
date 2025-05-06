import { ImgHTMLAttributes, useEffect, useState } from 'react';
import { getStorageUrl } from '@/logic/storage.ts';

export type FirebaseImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src'
> & {
  path: string | undefined;
  resolution?: string | number;
};

const cache = new Map<string, string>();

const FirebaseImage = ({
  path: _path,
  alt = '',
  resolution,
  style,
  ...props
}: FirebaseImageProps) => {
  let path: FirebaseImageProps['path'] = undefined;
  if (_path) {
    if (resolution) {
      const [filePath, ext] = _path.split('.');

      path = `${filePath}_${resolution}x${resolution}`;
      if (ext) {
        path += `.${ext}`;
      }
    } else {
      path = _path;
    }
  }

  const [src, setSrc] = useState<string | undefined>(undefined);
  const [loaded, setLoaded] = useState<{
    visible: boolean;
    cached: boolean;
  }>({
    visible: false,
    cached: false,
  });

  useEffect(() => {
    if (path !== undefined) {
      if (!cache.has(path)) {
        setSrc(undefined);
        setLoaded((prev) => ({
          ...prev,
          cached: false,
        }));
        getStorageUrl(path)
          .then((url) => {
            cache.set(path!, url);
            setSrc(url);
          })
          .catch((e) => {
            console.error(e);
            setSrc(undefined);
          });
      } else {
        setSrc(cache.get(path)!);
        setLoaded({
          visible: true,
          cached: true,
        });
      }
    } else {
      setSrc(undefined);
      setLoaded({
        visible: false,
        cached: false,
      });
    }
  }, [path]);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() =>
        setLoaded((prev) => ({
          ...prev,
          visible: true,
        }))
      }
      style={{
        transition:
          loaded.visible && !loaded.cached ? 'opacity 80ms' : undefined,
        opacity: loaded.visible ? 1 : 0,
      }}
      {...props}
    />
  );
};

export default FirebaseImage;
