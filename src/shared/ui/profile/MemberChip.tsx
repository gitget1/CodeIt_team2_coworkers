import { Profile } from './Profile';
import { cn } from '@/shared/lib/cn';
import type { ImageAsset, ProfileSize } from './Profile.types';

type Props = {
  imageSrc?: ImageAsset;
  name: string;
  /** 이름 아래 보조 줄 (예: 팀명) */
  teamName?: string;
  size?: ProfileSize;
  className?: string;
  avatarClassName?: string;
};

export function MemberChip({
  imageSrc,
  name,
  teamName,
  size = 'lg',
  className,
  avatarClassName,
}: Props) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Profile size={size} imageSrc={imageSrc} decorative className={avatarClassName} />
      <div className="min-w-0">
        <p className="text-sm font-medium text-txt-primary truncate">{name}</p>
        {teamName && (
          <p className="text-xs text-txt-default truncate">{teamName}</p>
        )}
      </div>
    </div>
  );
}
