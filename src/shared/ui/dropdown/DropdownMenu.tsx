import type { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';
import { useDropdown } from './Dropdown';

type MenuAlign = 'left' | 'right';
export type DropdownMenuAlign = MenuAlign;

const alignStyles: Record<MenuAlign, string> = {
  left: 'left-0',
  right: 'right-0',
};

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'align'> {
  children: React.ReactNode;
  className?: string;
  align?: MenuAlign;
}

export default function DropdownMenu({ children, className, align = 'right', ...props }: Props) {
  const { isOpen, menuRef, menuId } = useDropdown();

  if (!isOpen) return null;

  return (
    <div
      id={menuId}
      ref={menuRef}
      className={cn(
        'absolute mt-2 rounded-2xl border border-gray-200 bg-white shadow-md',
        alignStyles[align],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
