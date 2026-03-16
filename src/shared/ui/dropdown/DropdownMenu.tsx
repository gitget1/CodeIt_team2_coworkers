import { cn } from '@/shared/lib/cn';
import { useDropdown } from './Dropdown';

type MenuWidth = 'sm' | 'md' | 'lg';
type MenuAlign = 'left' | 'right';

const widthStyles: Record<MenuWidth, string> = {
  sm: 'w-[120px]',
  md: 'w-[130px]',
  lg: 'w-[140px]',
};

const alignStyles: Record<MenuAlign, string> = {
  left: 'left-0',
  right: 'right-0',
};

interface Props {
  children: React.ReactNode;
  className?: string;
  width?: MenuWidth;
  align?: MenuAlign;
}

export default function DropdownMenu({
  children,
  className,
  width = 'lg',
  align = 'right',
  ...props
}: Props) {
  const { isOpen, menuRef, menuId } = useDropdown();

  if (!isOpen) return null;

  return (
    <div
      id={menuId}
      ref={menuRef}
      role="menu"
      className={cn(
        'absolute mt-2 rounded-2xl border border-gray-200 bg-white shadow-md',
        widthStyles[width],
        alignStyles[align],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
