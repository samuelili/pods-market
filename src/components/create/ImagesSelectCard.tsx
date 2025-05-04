import { twMerge } from 'tailwind-merge';
import PreviewFile from '@/components/general/PreviewFile.tsx';
import Button from '@/components/buttons/Button.tsx';
import {
  IconArrowLeft,
  IconArrowRight,
  IconPhotoPlus,
  IconTrashX,
} from '@tabler/icons-react';
import Card, { CardProps } from '@/components/card/Card.tsx';
import { ChangeEvent, DragEvent, useCallback, useState } from 'react';
import FirebaseImage from '@/components/general/FirebaseImage.tsx';

export type FileSelectCardProps = CardProps & {
  files: (string | File)[] | undefined;
  onFilesChange: (files: (string | File)[]) => void;
};

const ImagesSelectCard = ({
  files = [],
  onFilesChange,
}: FileSelectCardProps) => {
  const [dragging, setDragging] = useState(false);

  const handleDropFile = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const newFiles: (string | File)[] = [];
      if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...e.dataTransfer.items].forEach((item, i) => {
          // If dropped items aren't files, reject them
          if (item.kind === 'file') {
            const file = item.getAsFile();

            if (file) {
              console.log(`… file[${i}].name = ${file?.name}`);
              files.push(file);
            }
          }
        });
      } else {
        // Use DataTransfer interface to access the file(s)
        [...e.dataTransfer.files].forEach((file, i) => {
          console.log(`… file[${i}].name = ${file.name}`);
          files.push(file);
        });
      }

      onFilesChange([...files, ...newFiles]);
    },
    [files, onFilesChange],
  );

  const handleFileSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files)
        onFilesChange([...files, ...e.currentTarget.files]);
    },
    [files, onFilesChange],
  );

  const removeFile = useCallback(
    (i: number) => {
      const newFiles = [...files];
      newFiles.splice(i, 1);
      onFilesChange(newFiles);
    },
    [files, onFilesChange],
  );

  const swapFile = useCallback(
    (i: number, j: number) => {
      const newFiles = [...files];
      [newFiles[i], newFiles[j]] = [newFiles[j], newFiles[i]];
      onFilesChange(newFiles);
    },
    [files, onFilesChange],
  );

  return (
    <Card
      className={twMerge(
        'mt-2 min-h-[12rem] w-full border-2 border-transparent bg-img p-1.5 transition-colors',
        files.length > 0
          ? 'grid items-start gap-2'
          : 'flex h-[12rem] w-full flex-col items-center justify-center gap-2 rounded-lg bg-img',
        dragging && 'border-dotted border-white',
      )}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDropFile}
      style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(6rem, 1fr))' }}
    >
      {files.map((file, i) => (
        <div className={'group relative aspect-square'} key={i}>
          {file instanceof File ? (
            <PreviewFile
              file={file}
              className={
                'aspect-square h-full w-full rounded-md object-cover transition-opacity group-hover:opacity-50 sm:h-[8rem] sm:w-[8rem]'
              }
            />
          ) : (
            <FirebaseImage
              path={file}
              className={
                'aspect-square h-full w-full rounded-md object-cover transition-opacity group-hover:opacity-50 sm:h-[8rem] sm:w-[8rem]'
              }
            />
          )}
          <div
            className={
              'absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-md bg-ink-6'
            }
          >
            {i + 1}
          </div>

          <Button
            className={
              'absolute right-1 top-1 bg-ink-6 p-1.5 opacity-0 transition-opacity group-hover:opacity-100'
            }
            title={'Remove'}
            onClick={() => removeFile(i)}
          >
            <IconTrashX size={'1.25rem'} />
          </Button>
          {i > 0 && (
            <Button
              className={
                'absolute bottom-1 left-1 bg-ink-6 p-1.5 opacity-0 transition-opacity group-hover:opacity-100'
              }
              title={'Remove'}
            >
              <IconArrowLeft
                size={'1.25rem'}
                onClick={() => swapFile(i - 1, i)}
              />
            </Button>
          )}
          {i < files.length - 1 && (
            <Button
              className={
                'absolute bottom-1 right-1 bg-ink-6 p-1.5 opacity-0 transition-opacity group-hover:opacity-100'
              }
              title={'Remove'}
            >
              <IconArrowRight
                size={'1.25rem'}
                onClick={() => swapFile(i, i + 1)}
              />
            </Button>
          )}
        </div>
      ))}
      <div
        className={twMerge(
          'relative flex flex-col items-center justify-center rounded-md p-2',
          files.length > 0 && 'bg-img',
        )}
      >
        <IconPhotoPlus className={'text-secondary-text'} />
        <p
          className={
            'mt-2 hidden max-w-sm text-center text-xs text-secondary-text md:block'
          }
        >
          {files.length > 0
            ? 'Click here to select more images!'
            : 'Drag and drop images or click here to select from your computer!'}
        </p>
        <input
          className={'absolute inset-0 cursor-pointer p-0 opacity-0'}
          type={'file'}
          multiple={true}
          onChange={handleFileSelect}
        />
      </div>
    </Card>
  );
};

export default ImagesSelectCard;
