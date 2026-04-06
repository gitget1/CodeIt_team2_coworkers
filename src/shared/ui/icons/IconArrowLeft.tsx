import { ICON_SIZE, IconProps } from '@/shared/constants/icon';
import { cn } from '@/shared/lib/cn';

export function IconArrowLeft({ size = ICON_SIZE.md, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0 text-[#64748B]', className)}
      {...props}
    >
      <g id="type=left, size=large">
        <path
          id="Vector"
          d="M15 6L9 12L15 18"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
