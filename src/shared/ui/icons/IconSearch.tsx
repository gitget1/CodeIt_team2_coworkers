import { IconProps, ICON_SIZE } from '@/shared/constants/icon';
import { cn } from '@/shared/lib/cn';

export const IconSearch = ({
  size = ICON_SIZE.sm,
  className,
  ...props
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <g clipPath="url(#clip0)">
        <circle
          cx="14.3321"
          cy="13.0742"
          r="8"
          transform="rotate(-45 14.3321 13.0742)"
          stroke="currentColor"
          strokeWidth="2.66667"
        />
        <path
          d="M24.5187 25.0079C25.0394 25.5286 25.8837 25.5286 26.4044 25.0079C26.925 24.4872 26.925 23.6429 26.4044 23.1222L24.5187 25.0079ZM19.8047 18.4082L18.8619 19.351L24.5187 25.0079L25.4615 24.0651L26.4044 23.1222L20.7475 17.4654L19.8047 18.4082Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};