import { cn } from '@/shared/lib/cn';
import Dropdown from '@/shared/ui/dropdown';

/** 사이드바 스타일이 적용된 드롭다운 메뉴. <Dropdown> 안에서 Dropdown.Menu 대신 사용 */
export function SidebarDropdownMenu({
  children,
  className,
  align = 'left',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'right';
}) {
  const alignClass = align === 'right' ? 'right-0' : 'left-0';
  return (
    <Dropdown.Menu
      align={align}
      className={cn(
        'z-50 min-w-[200px] rounded-lg border border-[var(--color-border-primary)] bg-background-primary py-2 shadow-md',
        alignClass,
        className,
      )}
      {...props}
    >
      {children}
    </Dropdown.Menu>
  );
}

/** 사이드바 스타일이 적용된 드롭다운 아이템. <Dropdown> 안에서 Dropdown.Item 대신 사용 */
export function SidebarDropdownItem({
  children,
  icon,
  isSelected = false,
  className,
  ...props
}: React.ComponentProps<typeof Dropdown.Item> & {
  icon?: React.ReactNode;
  isSelected?: boolean;
}) {
  const baseClass =
    'flex items-center gap-2 w-full min-h-[52px] px-3 rounded-lg text-left text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2';
  const stateClass = isSelected
    ? 'bg-[var(--color-brand-secondary)] text-brand-primary'
    : 'text-txt-secondary hover:bg-background-tertiary hover:text-txt-primary';

  return (
    <Dropdown.Item
      align="left"
      className={cn(baseClass, stateClass, className)}
      {...props}
    >
      {icon != null && (
        <span className="shrink-0 flex items-center justify-center w-5 h-5 [&>svg]:w-5 [&>svg]:h-5 text-inherit">
          {icon}
        </span>
      )}
      <span className="truncate">{children}</span>
    </Dropdown.Item>
  );
}
