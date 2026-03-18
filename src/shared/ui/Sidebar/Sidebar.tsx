import { cn } from '@/shared/lib/cn';

export interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  collapsedWidth?: number;
  expandedWidth?: number;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const DEFAULT_COLLAPSED_WIDTH = 64;
const DEFAULT_EXPANDED_WIDTH = 270;

export function Sidebar({
  isExpanded,
  onToggle,
  collapsedWidth = DEFAULT_COLLAPSED_WIDTH,
  expandedWidth = DEFAULT_EXPANDED_WIDTH,
  children,
  footer,
  className,
}: SidebarProps) {
  const width = isExpanded ? expandedWidth : collapsedWidth;

  return (
    <aside
      className={cn(
        'flex h-full flex-col shrink-0 bg-background-primary border-r border-[var(--color-border-primary)] transition-[width] duration-200 ease-out overflow-hidden',
        className,
      )}
      style={{ width }}
      aria-expanded={isExpanded}
    >
      <div className="min-h-0 flex-1 flex flex-col overflow-hidden">{children}</div>
      {footer != null && (
        <div className="shrink-0 border-t border-[var(--color-background-tertiary)]">
          {footer}
        </div>
      )}
    </aside>
  );
}
