import { useDropdown } from '@/shared/ui/dropdown/Dropdown';
import { cn } from '@/shared/lib/cn';
import { createPortal } from 'react-dom';
import { useTeamCardDropdownPosition } from './useTeamCardDropdownPosition';
import type { DropdownMenuAlign } from '@/shared/ui/dropdown';

type Props = {
  children: React.ReactNode;
  className?: string;
  align?: DropdownMenuAlign;
};

export function TeamCardDropdownMenu({ children, className, align = 'left' }: Props) {
  const { isOpen, menuRef, menuId, triggerRef } = useDropdown();
  const { mounted } = useTeamCardDropdownPosition(isOpen, triggerRef, menuRef, align);

  if (!isOpen || !mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div
      id={menuId}
      ref={menuRef}
      role="menu"
      className={cn('z-[100]', className)}
    >
      {children}
    </div>,
    document.body,
  );
}
