import { useId } from 'react';
import { ICON_SIZE, IconProps } from '@/shared/constants/icon';
import { cn } from '@/shared/lib/cn';

export function IconFoldRight({ size = ICON_SIZE.lg, className, ...props }: IconProps) {
  const clipId = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden
      {...props}
    >
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M2.82812 13.832L24 13.832M24 13.832L20.5 17.332M24 13.832L20.5 10.332"
          stroke="currentColor"
          strokeWidth="2.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.82812 21L14.3281 21"
          stroke="currentColor"
          strokeWidth="2.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.82812 6.83203L14.3281 6.83203"
          stroke="currentColor"
          strokeWidth="2.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="28" height="28" fill="white" transform="matrix(0 1 1 0 0 0)" />
        </clipPath>
      </defs>
    </svg>
  );
}

