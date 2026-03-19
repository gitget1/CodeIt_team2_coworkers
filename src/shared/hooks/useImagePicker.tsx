import { useRef, useState } from 'react';

export type ImageItem = { type: 'url'; url: string } | { type: 'file'; file: File };

type ImageChangePayload = {
  files: File[]; // 새로 추가된 파일
  remainedUrls: string[]; // 현재 남아있는 기존 이미지
  removedUrls: string[]; // 삭제된 기존 이미지
};
type Props = {
  maxCount?: number;
  defaultImages?: string[];
  onChange?: (payload: ImageChangePayload) => void;
};

export function useImagePicker({ maxCount = 5, defaultImages = [], onChange }: Props) {
  const [images, setImages] = useState<ImageItem[]>(
    defaultImages.map((url) => ({ type: 'url', url })),
  );
  const removedUrlsRef = useRef<string[]>([]);

  const triggerChange = (list: ImageItem[]) => {
    const files = list.filter((img) => img.type === 'file').map((img) => img.file);

    const remainedUrls = list.filter((img) => img.type === 'url').map((img) => img.url);

    onChange?.({
      files,
      remainedUrls,
      removedUrls: removedUrlsRef.current,
    });
  };

  const addImages = (files: FileList) => {
    const newImages: ImageItem[] = Array.from(files).map((file) => ({
      type: 'file',
      file,
    }));

    setImages((prev) => {
      const next = [...prev, ...newImages].slice(0, maxCount);

      triggerChange(next);

      return next;
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const target = prev[index];
      const next = prev.filter((_, i) => i !== index);

      if (target?.type === 'url') {
        removedUrlsRef.current.push(target.url);
      }

      triggerChange(next);

      return next;
    });
  };
  return {
    images,
    maxCount,
    addImages,
    removeImage,
  };
}
