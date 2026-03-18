import { useState, useSyncExternalStore } from 'react';
import { useScrollLock } from '@/shared/hooks/useScrollLock';
import { cn } from '@/shared/lib/cn';
import { AppSidebar } from './AppSidebar';
import { MobileHeader } from './MobileHeader';
import type { AppSidebarProps } from './types';

const MOBILE_BREAKPOINT = '(max-width: 375px)';

function useIsMobile(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') return () => {};
      const media = window.matchMedia(MOBILE_BREAKPOINT);
      media.addEventListener('change', onStoreChange);
      return () => media.removeEventListener('change', onStoreChange);
    },
    () => (typeof window !== 'undefined' ? window.matchMedia(MOBILE_BREAKPOINT).matches : false),
    () => false,
  );
}

export interface AppLayoutProps {
  children: React.ReactNode;
  /** 375px 초과 시 항상 보이는 사이드바에 전달할 props */
  sidebarProps?: Omit<AppSidebarProps, 'mobileDrawer' | 'onClose'>;
  className?: string;
}

export function AppLayout({ children, sidebarProps, className }: AppLayoutProps) {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useScrollLock(isMobile && isMobileMenuOpen);

  if (isMobile) {
    return (
      <div className={cn('flex flex-col min-h-screen bg-background-primary', className)}>
        <MobileHeader
          onMenuClick={() => setIsMobileMenuOpen(true)}
          isLoggedIn={sidebarProps?.isLoggedIn}
          onLoginClick={sidebarProps?.onLoginClick}
        />
        <main className="flex-1 min-h-0">{children}</main>

        {/* 모바일 메뉴 드로어 */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/50"
              aria-hidden
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <aside
              className="fixed inset-y-0 left-0 z-50 w-[270px] flex flex-col bg-background-primary shadow-xl"
              role="dialog"
              aria-label="메뉴"
            >
              <AppSidebar
                {...sidebarProps}
                mobileDrawer
                onClose={() => setIsMobileMenuOpen(false)}
              />
            </aside>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex min-h-screen bg-background-primary', className)}>
      <AppSidebar {...sidebarProps} />
      <main className="flex-1 min-h-0">{children}</main>
    </div>
  );
}
