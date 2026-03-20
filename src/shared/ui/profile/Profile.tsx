import { useState } from 'react';
import { IconUser } from '@/shared/ui/icons';
import { getImageSrc } from '@/shared/lib/getImageSrc';
import { cn } from '@/shared/lib/cn';
import { PROFILE_BORDER_RADIUS_PX, PROFILE_SIZE_PX } from './profileConstants';
import type { ProfileProps } from './Profile.types';

export function Profile({
  size = 'md',
  imageSrc,
  alt = '프로필 이미지',
  ariaLabel,
  title,
  className,
  borderClassName,
  iconClassName,
  imageClassName,
}: ProfileProps) {
  const sizePx = PROFILE_SIZE_PX[size];
  const borderRadiusPx = PROFILE_BORDER_RADIUS_PX[size];
  const [imgError, setImgError] = useState(false);
  const shouldShowImage = imageSrc != null && !imgError;

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center overflow-hidden shrink-0',
        shouldShowImage ? 'bg-transparent' : 'bg-background-tertiary',
        borderClassName,
        className,
      )}
      style={{ width: sizePx, height: sizePx, borderRadius: borderRadiusPx }}
      aria-label={ariaLabel}
      title={title}
    >
      {shouldShowImage ? (
        <img
          src={getImageSrc(imageSrc)}
          alt={alt}
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
