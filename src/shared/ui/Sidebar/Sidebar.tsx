import { useId, useLayoutEffect, useRef } from 'react';
import { cn } from '@/shared/lib/cn';
import { useSidebarStore } from '@/shared/store/sidebarStore';
import { SidebarContext } from './SidebarContext';

export interface SidebarProps {
  /** 펼침 여부. 미제공 시 전역 sidebarStore 사용 (확장성) */
  isExpanded?: boolean;
  /** 토글 핸들러. 미제공 시 전역 sidebarStore.toggle 사용 */
  onToggle?: () => void;
  /** 사이드바 패널 id (접근성 aria-controls 연결). 미제공 시 자동 생성 */
  id?: string;
  collapsedWidth?: number;
  expandedWidth?: number;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const DEFAULT_COLLAPSED_WIDTH = 64;
const DEFAULT_EXPANDED_WIDTH = 270;

export function Sidebar({
  isExpanded: isExpandedProp,
  onToggle: onToggleProp,
  id: idProp,
  collapsedWidth = DEFAULT_COLLAPSED_WIDTH,
  expandedWidth = DEFAULT_EXPANDED_WIDTH,
  children,
  footer,
  className,
}: SidebarProps) {
  const generatedId = useId();
  const sidebarId = idProp ?? generatedId;

  const { isExpanded: storeExpanded, toggle: storeToggle } = useSidebarStore();
  const isExpanded = isExpandedProp ?? storeExpanded;
  const onToggle = onToggleProp ?? storeToggle;

  const width = isExpanded ? expandedWidth : collapsedWidth;
  const asideRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = asideRef.current;
    if (!el) return;
    el.style.width = `${width}px`;
  }, [width]);

  return (
    <SidebarContext.Provider value={{ isExpanded, onToggle, sidebarId }}>
      <aside
        ref={asideRef}
        id={sidebarId}
        role="navigation"
        aria-label="사이드바"
        className={cn(
          'flex h-full flex-col shrink-0 bg-background-primary border-r border-background-tertiary transition-[width] duration-200 ease-out overflow-hidden',
          className,
        )}
      >
        <div className="min-h-0 flex-1 flex flex-col overflow-hidden">{children}</div>
        {footer != null && (
          <div className="shrink-0 border-t border-[var(--color-background-tertiary)]">
            {footer}
          </div>
        )}
      </aside>
    </SidebarContext.Provider>
  );
}
