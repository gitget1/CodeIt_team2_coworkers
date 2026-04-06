import { useEffect, useState } from 'react';
import { LAYOUT_SIDEBAR_RAIL_MIN_WIDTH_PX } from '@/shared/constants/layoutBreakpoints';
import { useScrollLock } from '@/shared/hooks/useScrollLock';
import { cn } from '@/shared/lib/cn';
import { AppSidebar } from './AppSidebar';
import { MobileHeader } from './MobileHeader';
import type { AppSidebarProps } from './types';

export interface AppLayoutProps {
  children: React.ReactNode;
  /** 모바일 브레이크포인트 초과 시 항상 보이는 사이드바에 전달할 props */
  sidebarProps?: Omit<AppSidebarProps, 'mobileDrawer' | 'onClose'>;
  className?: string;
}

export function AppLayout({ children, sidebarProps, className }: AppLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useScrollLock(isMobileMenuOpen);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onResize = () => {
      if (window.innerWidth >= LAYOUT_SIDEBAR_RAIL_MIN_WIDTH_PX) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMobileMenuOpen]);

  return (
    <div
      className={cn(
        'bg-background-primary flex min-h-screen flex-col md:flex-row',
        className,
      )}
    >
      <MobileHeader
        className="flex w-full shrink-0 md:hidden"
        onMenuClick={() => setIsMobileMenuOpen(true)}
        isLoggedIn={sidebarProps?.isLoggedIn}
        onLoginClick={sidebarProps?.onLoginClick}
      />
      <div className="bg-background-primary sticky top-0 z-[9999] hidden h-screen shrink-0 self-start !overflow-visible md:block">
        <AppSidebar {...sidebarProps} />
      </div>
      <main className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto">
        {children}
      </main>

      {isMobileMenuOpen ? (
        <div className="layout-app-drawer-layer">
          <div
            className="fixed inset-0 z-40 bg-black/50"
            aria-hidden
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside
            className="bg-background-primary fixed inset-y-0 left-0 z-50 flex w-67.5 flex-col shadow-xl"
            role="dialog"
            aria-label="메뉴"
          >
            <AppSidebar
              {...sidebarProps}
              mobileDrawer
              onClose={() => setIsMobileMenuOpen(false)}
            />
          </aside>
        </div>
      ) : null}
    </div>
  );
}
