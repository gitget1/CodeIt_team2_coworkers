import Link from 'next/link';
import { cn } from '@/shared/lib/cn';
import { useSidebarContext } from './SidebarContext';
import { SR_ONLY, NAV_ITEM_BASE, NAV_ITEM_SELECTED, NAV_ITEM_DEFAULT, NAV_ITEM_ICON_WRAPPER } from './sidebarClasses';

export interface SidebarNavItemProps {
  /** 메뉴 라벨. 접힌 상태에서는 시각적으로 숨기고 sr-only로 스크린 리더에만 노출 */
  label: string;
  /** 왼쪽 아이콘 */
  icon?: React.ReactNode;
  /** 현재 페이지/선택 여부 (강조 스타일, 링크일 때 aria-current="page" 사용) */
  isSelected?: boolean;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 링크로 쓸 경우 href (onClick 대신 사용) */
  href?: string;
  /** 펼침 여부. 미제공 시 SidebarContext에서 가져옴 (isExpanded로 통일) */
  isExpanded?: boolean;
  className?: string;
}

export function SidebarNavItem({
  label,
  icon,
  isSelected = false,
  onClick,
  href,
  isExpanded: isExpandedProp,
  className,
}: SidebarNavItemProps) {
  const context = useSidebarContext();
  const isExpanded = isExpandedProp ?? context?.isExpanded ?? true;
  const isCollapsed = !isExpanded;

  const content = (
    <>
      {icon != null && <span className={NAV_ITEM_ICON_WRAPPER}>{icon}</span>}
      {isCollapsed ? (
        <span className={SR_ONLY}>{label}</span>
      ) : (
        <span className="truncate">{label}</span>
      )}
    </>
  );

  const stateClass = isSelected ? NAV_ITEM_SELECTED : NAV_ITEM_DEFAULT;

  if (href != null) {
    return (
      <Link
        href={href}
        className={cn(NAV_ITEM_BASE, stateClass, isCollapsed && 'justify-center px-0 w-10 mx-auto', className)}
        aria-current={isSelected ? 'page' : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(NAV_ITEM_BASE, stateClass, isCollapsed && 'justify-center px-0 w-10 mx-auto', className)}
      aria-current={isSelected ? 'true' : undefined}
    >
      {content}
    </button>
  );
}
