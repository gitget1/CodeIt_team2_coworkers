import { Profile } from './Profile';
import { cn } from '@/shared/lib/cn';
import type { ImageAsset, ProfileSize } from './Profile.types';

type Props = {
  imageSrc?: ImageAsset;
  name: string;
  email?: string;
  size?: ProfileSize;
  className?: string;
  avatarClassName?: string;
};

export function MemberChip({
  imageSrc,
  name,
  email,
  size = 'lg',
  className,
  avatarClassName,
}: Props) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Profile size={size} imageSrc={imageSrc} decorative className={avatarClassName} />
      <div className="min-w-0">
        <p className="text-sm font-medium text-txt-primary truncate">{name}</p>
        {email && (
          <p className="text-xs text-txt-default truncate">{email}</p>
        )}
      </div>
    </div>
  );
}
