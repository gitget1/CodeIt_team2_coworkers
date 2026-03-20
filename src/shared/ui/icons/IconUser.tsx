import { IconProps } from '@/shared/constants/icon';
import { cn } from '@/shared/lib/cn';

/**
 * 사람(유저) 기본 아이콘
 * - 기존 assets의 `user.svg`를 inline SVG로 컴포넌트화해서 currentColor 제어 가능하게 만듭니다.
 */
export function IconUser({ size, className, ...props }: IconProps) {
  const iconSize = size ?? 24;

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden
      {...props}
    >
      <path
        d="M29.9948 33.3327H9.99479C9.07432 33.3327 8.32812 32.5865 8.32812 31.666V28.3327C8.32812 24.6508 11.3129 21.666 14.9948 21.666H24.9948C28.6767 21.666 31.6615 24.6508 31.6615 28.3327V31.666C31.6615 32.5865 30.9153 33.3327 29.9948 33.3327Z"
        fill="currentColor"
      />
      <path
        d="M20 18.334C22.7614 18.334 25 16.0954 25 13.334C25 10.5726 22.7614 8.33398 20 8.33398C17.2386 8.33398 15 10.5726 15 13.334C15 16.0954 17.2386 18.334 20 18.334Z"
        fill="currentColor"
      />
    </svg>
  );
}

