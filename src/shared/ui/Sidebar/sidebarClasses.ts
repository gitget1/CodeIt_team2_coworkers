/**
 * 사이드바 공통 스타일 클래스.
 * NavItem, Header, Dropdown 등에서 재사용해 중복을 줄입니다.
 */

/** 스크린 리더 전용 (시각적으로 숨김, 보조 기기에는 노출) */
export const SR_ONLY =
  'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]';

/** 포커스 링 (버튼/링크 공통) */
export const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2';

/** 네비 아이템 기본 (공통 레이아웃 + 포커스) */
export const NAV_ITEM_BASE =
  'flex items-center gap-2 w-full min-h-[52px] px-3 rounded-lg text-left text-base font-medium transition-colors ' +
  FOCUS_RING;

/** 네비 아이템 선택 상태 */
export const NAV_ITEM_SELECTED = 'bg-[var(--color-brand-secondary)] text-brand-primary';

/** 네비 아이템 기본 상태 */
export const NAV_ITEM_DEFAULT = 'text-txt-secondary hover:bg-background-tertiary hover:text-txt-primary';

/** 네비 아이템 내 아이콘 래퍼 */
export const NAV_ITEM_ICON_WRAPPER =
  'shrink-0 flex items-center justify-center w-5 h-5 [&>svg]:w-5 [&>svg]:h-5 text-inherit';

/** 헤더 토글 버튼 (접기/메뉴 열기) */
export const HEADER_TOGGLE_BUTTON =
  'shrink-0 flex items-center justify-center w-10 h-10 rounded-lg text-txt-default hover:bg-background-tertiary hover:text-txt-primary ' +
  FOCUS_RING;
