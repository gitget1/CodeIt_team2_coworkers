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
        <div key={index} className={cn('relative h-[120px] w-[120px]', className)}>
          <img src={objectUrls[index]} className="h-full w-full rounded object-cover" />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-1 right-1 bg-black px-1 text-xs text-white"
          >
            <IconClose size={16} />
          </button>
        </div>
      ))}
    </>
  );
}
