import { useEffect, useState } from 'react';
import { IconUser } from '@/shared/ui/icons';
import { cn } from '@/shared/lib/cn';
import { getImageSrc } from '@/shared/lib/getImageSrc';
import type { ImageAsset } from './Profile.types';
import { MEMBER_COMPACT_STACK_AVATAR } from './memberCompactStack.constants';

type Props = {
  imageSrc?: ImageAsset;
  zIndex: number;
  overlap: boolean;
};

export function MemberCompactStackFace({ imageSrc, zIndex, overlap }: Props) {
  const [imgOk, setImgOk] = useState(imageSrc != null);

  useEffect(() => {
    setImgOk(imageSrc != null);
  }, [imageSrc]);

  return (
    <div
      className={cn(MEMBER_COMPACT_STACK_AVATAR, overlap && '-ml-1.5 md:-ml-2')}
      style={{ zIndex }}
      aria-hidden
    >
      {imgOk && imageSrc ? (
        <img
          src={getImageSrc(imageSrc)}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setImgOk(false)}
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center">
          <IconUser size={12} className="text-icon-inverse md:hidden" />
          <IconUser size={14} className="hidden text-icon-inverse md:block" />
        </span>
      )}
    </div>
  );
}

