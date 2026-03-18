import { getImageSrc } from '@/shared/lib/getImageSrc';
import { cn } from '@/shared/lib/cn';
import { LogoIcon, HamburgerIcon } from './sidebar-icons';
import userIcon from '@/shared/assets/icons/user.svg';

const defaultProfileImgSrc = getImageSrc(userIcon);
const defaultProfileBgClass = 'rounded-xl bg-[#E2E8F0]';

interface MobileHeaderProps {
  onMenuClick: () => void;
  /** 로그인 여부. false면 오른쪽에 프로필 대신 '로그인' 표시 */
  isLoggedIn?: boolean;
  /** 로그인 버튼 클릭 시 (isLoggedIn false일 때) */
  onLoginClick?: () => void;
  className?: string;
}

export function MobileHeader({ onMenuClick, isLoggedIn = true, onLoginClick, className }: MobileHeaderProps) {
  return (
    <header
      className={cn(
        'flex items-center gap-2 shrink-0 h-14 px-3 border-b border-[var(--color-border-primary)] bg-background-primary',
        className,
      )}
    >
      <button
        type="button"
        onClick={onMenuClick}
        className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg text-txt-default hover:bg-background-tertiary hover:text-txt-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        aria-label="메뉴 열기"
      >
        <HamburgerIcon className="text-slate-300" />
      </button>
      <span className="shrink-0 flex items-center justify-center w-8 h-8 text-brand-primary" aria-hidden>
        <LogoIcon />
      </span>
      <div className="min-w-0 flex-1" aria-hidden />
      {isLoggedIn ? (
        <span className={cn('shrink-0 flex items-center justify-center w-9 h-9 overflow-hidden', defaultProfileBgClass)} aria-hidden>
          <img src={defaultProfileImgSrc} alt="" className="h-full w-full object-contain" />
        </span>
      ) : (
        <button
          type="button"
          onClick={onLoginClick}
          className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-txt-primary hover:bg-background-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        >
          로그인
        </button>
      )}
    </header>
  );
}
