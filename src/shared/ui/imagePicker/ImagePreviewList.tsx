import { useEffect, useState } from 'react';
import { ImageItem } from '../../hooks/useImagePicker';
import { cn } from '@/shared/lib/cn';
import { IconClose } from '../icons';

type Props = {
  images: ImageItem[];
  onRemove: (index: number) => void;
  className?: string;
};

export function ImagePreviewList({ images, onRemove, className }: Props) {
  const [objectUrls, setObjectUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = images.map((image) =>
      image.type === 'file' ? URL.createObjectURL(image.file) : image.url,
    );
    setObjectUrls(urls);

    return () => {
      urls.forEach((url, i) => {
        if (images[i].type === 'file') {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [images]);

  return (
    <>
      {images.map((image, index) => (
        <div key={index} className={cn('relative w-20 h-20 md:h-30 md:w-30', className)}>
          <img src={objectUrls[index]} className="h-full w-full rounded object-cover" />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute -top-1 -right-1 border border-slate-400 w-6 h-6 flex items-center justify-center  bg-white px-1 text-xs rounded-full text-slate-500"
          >
            <IconClose size={16} />
          </button>
        </div>
      ))}
    </>
  );
}
