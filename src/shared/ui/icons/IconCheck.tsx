import { IconProps, ICON_SIZE } from '@/shared/constants/icon';
import { cn } from '@/shared/lib/cn';

export const IconCheck = ({ size = ICON_SIZE.sm, className, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <path
        d="M3 8.5L7.11349 11.7908C7.25974 11.9078 7.47219 11.8889 7.59553 11.748L13.5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
