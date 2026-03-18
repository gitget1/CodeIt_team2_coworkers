import Link from 'next/link';
import { cn } from '@/shared/lib/cn';

export interface SidebarNavItemProps {
  /** 메뉴 라벨. 접힌 상태에서는 숨겨짐 */
  label: string;
  /** 왼쪽 아이콘 */
  icon?: React.ReactNode;
  /** 선택 여부 (강조 스타일) */
  isSelected?: boolean;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 링크로 쓸 경우 href (onClick 대신 사용) */
  href?: string;
  /** 접힌 상태인지 (아이콘만 보일지) */
  isCollapsed?: boolean;
  className?: string;
}

export function SidebarNavItem({
  label,
  icon,
  isSelected = false,
  onClick,
  href,
  isCollapsed = false,
  className,
}: SidebarNavItemProps) {
  const content = (
    <>
      {icon != null && <span className="shrink-0 flex items-center justify-center w-5 h-5 [&>svg]:w-5 [&>svg]:h-5 text-inherit">{icon}</span>}
      {!isCollapsed && <span className="truncate">{label}</span>}
    </>
  );

  const baseClass =
    'flex items-center gap-2 w-full min-h-[52px] px-3 rounded-lg text-left text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2';
  const stateClass = isSelected
    ? 'bg-[var(--color-brand-secondary)] text-brand-primary'
    : 'text-txt-secondary hover:bg-background-tertiary hover:text-txt-primary';

  if (href != null) {
    return (
      <Link
        href={href}
        className={cn(baseClass, stateClass, isCollapsed && 'justify-center px-0 w-10 mx-auto', className)}
        aria-selected={isSelected}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(baseClass, stateClass, isCollapsed && 'justify-center px-0 w-10 mx-auto', className)}
      aria-selected={isSelected}
    >
      {content}
    </button>
  );
}
