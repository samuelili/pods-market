import { twMerge } from 'tailwind-merge';
import PreviewFile from '@/components/general/PreviewFile.tsx';
import {IconPhotoOff, IconPhotoPlus} from '@tabler/icons-react';
import Card, { CardProps } from '@/components/card/Card.tsx';
import { ChangeEvent, DragEvent, useCallback, useState } from 'react';
import FirebaseImage from "@/components/general/FirebaseImage.tsx";

export type AvatarImageSelectProps = CardProps & {
  currentAvatar?: string | null;
  file: File | undefined;
  onFileChange: (file: File) => void;
};

const AvatarImageSelectCard = ({
  currentAvatar,
  file,
  onFileChange,
  className,
  ...props
}: AvatarImageSelectProps) => {
  const [dragging, setDragging] = useState(false);

  const handleDropFile = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...e.dataTransfer.items].forEach((item, i) => {
          // If dropped items aren't file, reject them
          if (item.kind === 'file') {
            const file = item.getAsFile();

            if (file) {
              console.log(`… file[${i}].name = ${file?.name}`);
              onFileChange(file);
            }
          }
        });
      } else {
        // Use DataTransfer interface to access the file(s)
        if (e.dataTransfer.files.length > 0) {
          onFileChange(e.dataTransfer.files[0]);
        }
      }
    },
    [onFileChange],
  );

  const handleFileSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files && e.currentTarget.files.length > 0)
        onFileChange(e.currentTarget.files[0]);
    },
    [file, onFileChange],
  );

  return (
    <div
      className={twMerge('flex w-full gap-layout', className)}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDropFile}
      {...props}
    >
      <div
        className={
          'flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-img text-4xl'
        }
      >
        {file ? (
          <PreviewFile file={file} className={'h-full w-full object-cover'} />
        ) : currentAvatar ? (
          <FirebaseImage path={currentAvatar} className={'h-full w-full object-cover'} resolution={128}/>
        ) : (
          <IconPhotoOff/>
        )}
      </div>
      <Card
        className={twMerge(
          'relative flex flex-col items-center justify-center rounded-md !bg-img p-layout',
          'border-2 border-transparent bg-transparent p-1.5 transition-colors',
          dragging && 'border-dotted border-white',
        )}
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropFile}
      >
        <IconPhotoPlus className={'text-secondary-text'} />
        <p
          className={
            'mt-2 hidden max-w-sm text-center text-xs text-secondary-text md:block'
          }
        >
          Drag and drop images or click here to select from your computer!
        </p>
        <input
          className={'absolute inset-0 cursor-pointer p-0 opacity-0'}
          type={'file'}
          multiple={true}
          onChange={handleFileSelect}
        />
      </Card>
    </div>
  );
};

export default AvatarImageSelectCard;
