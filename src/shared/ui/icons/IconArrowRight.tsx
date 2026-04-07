import { ICON_SIZE, IconProps } from '@/shared/constants/icon';
import { cn } from '@/shared/lib/cn';

export function IconArrowRight({ size = ICON_SIZE.md, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      {...props}
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="#64748B"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
