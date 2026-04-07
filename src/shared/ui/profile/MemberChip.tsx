import { Profile } from './Profile';
import { cn } from '@/shared/lib/cn';
import type { ImageAsset, ProfileSize } from './Profile.types';

type Props = {
  imageSrc?: ImageAsset;
  name: string;
  /** 이름 아래 보조 줄 (예: 팀명) */
  teamName?: string;
  email?: string;
  isAdmin?: boolean;
  size?: ProfileSize;
  className?: string;
  avatarClassName?: string;
};

export function MemberChip({
  imageSrc,
  name,
  teamName,
  email,
  isAdmin = false,
  size = 'md',
  className,
  avatarClassName,
}: Props) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Profile size={size} imageSrc={imageSrc} decorative className={avatarClassName} />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p
            className={cn(
              'truncate font-medium text-txt-primary',
              size === 'lg' ? 'text-sm' : 'text-[13px]',
            )}
          >
            {name}
          </p>
          {isAdmin && (
            <span className="shrink-0 rounded-md bg-brand-secondary px-1.5 py-0.5 text-[10px] font-semibold text-brand-primary">
              관리자
            </span>
          )}
        </div>
        {teamName && <p className="truncate text-xs text-txt-default">{teamName}</p>}
        {email && <p className="truncate text-[12px] text-txt-default">{email}</p>}
      </div>
    </div>
  );
}
