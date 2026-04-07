import { useState } from 'react';
import { IconUser } from '@/shared/ui/icons';
import { getImageSrc } from '@/shared/lib/getImageSrc';
import { cn } from '@/shared/lib/cn';
import { PROFILE_SIZE_PX } from './profileConstants';
import type { ProfileProps, ProfileSize } from './Profile.types';

/** Edge/a11y 린터·인라인 스타일 경고 회피 — profileConstants 와 동일 px */
const PROFILE_LAYOUT_CLASS: Record<ProfileSize, string> = {
  xs: 'size-5 rounded-[5px]',
  sm: 'w-6 h-6 rounded-[6px]',
  md: 'w-8 h-8 rounded-[8px]',
  lg: 'w-10 h-10 rounded-[12px]',
};

export function Profile({
  size = 'md',
  imageSrc,
  alt = '프로필 이미지',
  decorative = false,
  ariaLabel,
  title,
  className,
  borderClassName,
  iconClassName,
  imageClassName,
}: ProfileProps) {
  const sizePx = PROFILE_SIZE_PX[size];
  const [imgError, setImgError] = useState(false);
  const shouldShowImage = imageSrc != null && !imgError;
  const imgAlt = decorative ? '' : alt;

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center overflow-hidden shrink-0',
        PROFILE_LAYOUT_CLASS[size],
        shouldShowImage ? 'bg-transparent' : 'bg-background-tertiary',
        borderClassName,
        className,
      )}
      {...(decorative ? ({ 'aria-hidden': 'true' } as const) : {})}
      {...(!decorative && ariaLabel != null && ariaLabel !== '' ? { 'aria-label': ariaLabel } : {})}
      {...(!decorative && title != null && title !== '' ? { title } : {})}
    >
      {shouldShowImage ? (
        <img
          src={getImageSrc(imageSrc)}
          alt={imgAlt}
          className={cn('h-full w-full object-cover', imageClassName)}
          onError={() => setImgError(true)}
        />
      ) : (
        <IconUser
          size={sizePx}
          className={cn('text-icon-inverse', iconClassName)}
        />
      )}
    </div>
  );
}
