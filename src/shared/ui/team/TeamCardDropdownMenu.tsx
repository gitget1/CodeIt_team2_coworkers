import { useDropdown } from '@/shared/ui/dropdown/Dropdown';
import { cn } from '@/shared/lib/cn';
import { createPortal } from 'react-dom';
import { useTeamCardDropdownPosition } from './useTeamCardDropdownPosition';

type Props = {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'right';
};

/** TeamCard용 포털 메뉴. overflow 부모에서 생기는 스크롤을 방지합니다. */
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
