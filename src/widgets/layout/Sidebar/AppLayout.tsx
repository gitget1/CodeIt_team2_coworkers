import { useLayoutEffect, useState } from 'react';
import { LAYOUT_MOBILE_MAX_WIDTH_PX } from '@/shared/constants/layoutBreakpoints';
import { useScrollLock } from '@/shared/hooks/useScrollLock';
import { cn } from '@/shared/lib/cn';
import { AppSidebar } from './AppSidebar';
import { MobileHeader } from './MobileHeader';
import type { AppSidebarProps } from './types';

/** `(max-width: 768px)` — Tailwind `max-[768px]:` · globals `--breakpoint-mobile` 과 동일 */
const NARROW_VIEWPORT_MEDIA_QUERY = `(max-width: ${LAYOUT_MOBILE_MAX_WIDTH_PX}px)`;

export interface AppLayoutProps {
  children: React.ReactNode;
  /** 모바일 브레이크포인트 초과 시 항상 보이는 사이드바에 전달할 props */
  sidebarProps?: Omit<AppSidebarProps, 'mobileDrawer' | 'onClose'>;
  className?: string;
}

export function AppLayout({ children, sidebarProps, className }: AppLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);

  const drawerActive = isMobileMenuOpen && isNarrowViewport;
  useScrollLock(drawerActive);

  useLayoutEffect(() => {
    const mq = window.matchMedia(NARROW_VIEWPORT_MEDIA_QUERY);
    const sync = () => {
      const narrow = mq.matches;
      setIsNarrowViewport(narrow);
      if (!narrow) setIsMobileMenuOpen(false);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <div
      className={cn(
        'bg-background-primary flex min-h-screen flex-col min-[769px]:flex-row',
        className,
      )}
    >
      <MobileHeader
        className="hidden w-full shrink-0 max-[768px]:flex"
        onMenuClick={() => setIsMobileMenuOpen(true)}
        isLoggedIn={sidebarProps?.isLoggedIn}
        onLoginClick={sidebarProps?.onLoginClick}
      />
      {/*
        긴 메인(랜딩)에서 사이드바가 문서 높이만큼 늘지 않도록 뷰포트에 고정 + 레이어 (dev/COW-129)
      */}
      <div className="bg-background-primary sticky top-0 z-[9999] hidden h-screen shrink-0 !overflow-visible min-[769px]:block">
        <AppSidebar {...sidebarProps} />
      </div>
      <main className="relative flex min-h-0 min-w-0 flex-1 flex-col">{children}</main>

      {drawerActive && (
        <>
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
        </>
      )}
    </div>
  );
}
