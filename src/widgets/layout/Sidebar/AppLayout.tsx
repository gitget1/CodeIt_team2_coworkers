import { useEffect, useState } from 'react';
import { useScrollLock } from '@/shared/hooks/useScrollLock';
import { cn } from '@/shared/lib/cn';
import { AppSidebar } from './AppSidebar';
import { MobileHeader } from './MobileHeader';
import type { AppSidebarProps } from './types';

/** globals.css 의 `--breakpoint-mobile`와 값 동기화 필요 */
const MOBILE_MAX_WIDTH_PX = 768;
const MOBILE_MEDIA = `(max-width: ${MOBILE_MAX_WIDTH_PX}px)`;

/**
 * 모바일 뷰포트 여부. 미확정 시 true(모바일 UI)로 두어 모바일 접속 시 데스크톱 UI가 잠깐 보이는 플래시 방지.
 */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(MOBILE_MEDIA);
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isMobile ?? true;
}

export interface AppLayoutProps {
  children: React.ReactNode;
  /** 모바일 브레이크포인트 초과 시 항상 보이는 사이드바에 전달할 props */
  sidebarProps?: Omit<AppSidebarProps, 'mobileDrawer' | 'onClose'>;
  className?: string;
}

export function AppLayout({ children, sidebarProps, className }: AppLayoutProps) {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useScrollLock(isMobile && isMobileMenuOpen);

  if (isMobile) {
    return (
      <div className={cn('bg-background-primary flex min-h-screen flex-col', className)}>
        <MobileHeader
          onMenuClick={() => setIsMobileMenuOpen(true)}
          isLoggedIn={sidebarProps?.isLoggedIn}
          onLoginClick={sidebarProps?.onLoginClick}
        />
        <main className="relative flex min-h-0 flex-1 flex-col">{children}</main>

        {/* 모바일 메뉴 드로어 */}
        {isMobileMenuOpen && (
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

  return (
    <div className={cn('bg-background-primary flex min-h-screen', className)}>
      {/* 긴 메인(랜딩)에서 사이드바가 문서 높이만큼 늘지 않도록 뷰포트에 고정 */}
      <div className="bg-background-primary sticky top-0 z-[9999] h-screen shrink-0 !overflow-visible">
        <AppSidebar {...sidebarProps} />
      </div>
      <main className="min-h-0 flex-1">{children}</main>
    </div>
  );
}
