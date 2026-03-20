import { Profile } from './Profile';
import { cn } from '@/shared/lib/cn';
import type { ImageAsset, ProfileSize } from './Profile.types';

type Props = {
  imageSrc?: ImageAsset;
  name: string;
  description?: string;
  size?: ProfileSize;
  className?: string;
  avatarClassName?: string;
};

export function MemberChip({
  imageSrc,
  name,
  description,
  size = 'lg',
  className,
  avatarClassName,
}: Props) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Profile size={size} imageSrc={imageSrc} alt={`${name} 프로필`} className={avatarClassName} />
      <div className="min-w-0">
        <p className="text-sm font-medium text-txt-primary truncate">{name}</p>
        {description && (
          <p className="text-xs text-txt-default truncate">{description}</p>
        )}
      </div>
    </div>
  );
}
