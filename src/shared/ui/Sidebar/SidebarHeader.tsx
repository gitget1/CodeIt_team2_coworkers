import { cn } from '@/shared/lib/cn';

export interface SidebarHeaderProps {
  /** 로고 영역 (이미지 또는 텍스트). 접힌 상태에서는 잘릴 수 있음 */
  logo?: React.ReactNode;
  /** 토글 버튼 (햄버거/접기). 미제공 시 기본 아이콘 사용 */
  toggleButton?: React.ReactNode;
  /** 펼침 여부 (토글 버튼 aria 등에 사용) */
  isExpanded: boolean;
  /** 토글 클릭 핸들러 */
  onToggle: () => void;
  /** 헤더에 토글 버튼 표시 여부. 레이아웃/사이드바 조합에 따라 바깥에서 조건부로 넘깁니다. */
  showToggle?: boolean;
  className?: string;
}

function DefaultToggleIcon({ isExpanded }: { isExpanded: boolean }) {
  if (isExpanded) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M15 18l-6-6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor" />
      <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
      <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

export function SidebarHeader({
  logo,
  toggleButton,
  isExpanded,
  onToggle,
  showToggle = true,
  className,
}: SidebarHeaderProps) {

  return (
    <header
      className={cn(
        'flex items-center justify-between gap-2 shrink-0 h-14 px-3 border-b border-[var(--color-border-primary)]',
        className,
      )}
    >
      <div className={cn('flex items-center gap-2 min-w-0 flex-1', !showToggle && 'justify-center')}>
        {logo != null && <div className="shrink-0 flex items-center justify-center overflow-hidden">{logo}</div>}
      </div>
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg text-txt-default hover:bg-background-tertiary hover:text-txt-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          aria-label={isExpanded ? '사이드바 접기' : '사이드바 열기'}
          aria-expanded={isExpanded}
        >
          {toggleButton ?? <DefaultToggleIcon isExpanded={isExpanded} />}
        </button>
      )}
    </header>
  );
}
