import { cn } from '@/shared/lib/cn';
import { IconImg } from '../icons/IconImg';
type Props = {
  disabled: boolean;
  onUpload: (files: FileList) => void;
  count: number;
  maxCount: number;
  isCount?: boolean;
  className?: string;
};

export function ImageUploadSlot({
  disabled,
  onUpload,
  count,
  maxCount,
  isCount = true,
  className,
}: Props) {
  if (disabled) return null;

  return (
    <label
      className={cn(
        'flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center rounded-[10px] border',
        className,
      )}
    >
      <IconImg/>
      <input
        type="file"
        multiple
        accept="image/*"
        hidden
        onChange={(e) => {
          if (!e.target.files) return;
          onUpload(e.target.files);
          e.target.value = '';
        }}
      />

      {isCount && (
        <div className='pt-4'>
          {count}/{maxCount}
        </div>
      )}
    </label>
  );
}
