import { useImagePicker } from '@/shared/hooks/useImagePicker';
import { ImagePreviewList } from '@/shared/ui/imagePicker/ImagePreviewList';
import { ImageUploadSlot } from '@/shared/ui/imagePicker/ImageUploadSlot';

export default function Test() {
  const picker = useImagePicker({
    maxCount: 5,
    defaultImages: [
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7',
    ],
  });

  return (
    <div className="mt-12 flex justify-center gap-2">
      <ImagePreviewList
        images={picker.images}
        onRemove={picker.removeImage}
        className="h-[200px]"
      />

      <ImageUploadSlot
        disabled={picker.images.length >= picker.maxCount}
        onUpload={picker.addImages}
        count={picker.images.length}
        maxCount={picker.maxCount}
        isCount={true}
        className="h-[200px] w-[200px] rounded-xl bg-blue-50"
      />
    </div>
  );
}
