import { ImgHTMLAttributes, useEffect, useState } from 'react';

export type PreviewFileProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src'
> & {
  file: File;
};

const PreviewFile = ({ file, alt, ...props }: PreviewFileProps) => {
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (FileReader) {
      const fr = new FileReader();
      fr.onload = function () {
        if (fr.result) setSrc(fr.result as string);
      };
      fr.readAsDataURL(file);
    }
  }, [file]);

  return <img src={src} {...props} alt={alt ?? ''} />;
};

export default PreviewFile;
