import { useId } from 'react';
import { ICON_SIZE, IconProps } from '@/shared/constants/icon';
import { cn } from '@/shared/lib/cn';

export function IconFoldLeft({ size = ICON_SIZE.lg, className, ...props }: IconProps) {
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
          d="M24 14L2.82812 14M2.82812 14L6.32813 10.5M2.82812 14L6.32813 17.5"
          stroke="currentColor"
          strokeWidth="2.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 6.83203L12.5 6.83203"
          stroke="currentColor"
          strokeWidth="2.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 21H12.5"
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

