import { cn } from '@/shared/lib/cn';
import { useDropdown } from './Dropdown';

type ItemAlign = 'left' | 'center';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  closeOnClick?: boolean;
  className?: string;
  align?: ItemAlign;
}

const alignStyles: Record<ItemAlign, string> = {
  left: 'text-left',
  center: 'text-center',
};

export default function DropdownItem({
  children,
  onClick,
  closeOnClick = true,
  type = 'button',
  className,
  align = 'center',
  ...props
}: Props) {
  const { setOpen } = useDropdown();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    if (closeOnClick) {
      setOpen(false);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      role="menuitem"
      className={cn(
        'hover:bg-brand-primary w-full cursor-pointer px-[18px] py-[12px] text-lg text-gray-800 hover:text-white',
        alignStyles[align],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
