import { ICON_SIZE, IconProps } from '@/shared/constants/icon';
import { cn } from '@/shared/lib/cn';

export function IconKebab({ size = ICON_SIZE.md, className, ...props }: IconProps) {
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
      <circle cx="12" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="16.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

