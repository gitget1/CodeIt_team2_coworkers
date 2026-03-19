import { IconProps, ICON_SIZE } from '@/shared/constants/icon';
import { cn } from '@/shared/lib/cn';

export const IconCommentBtn = ({ size = ICON_SIZE.md, className, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <path
        d="M8 11L12 7M12 7L16 11M12 7V16"
        stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
      />
    </svg>
  );
};
