/**
 * `--breakpoint-mobile` · 일부 UI(멤버 스택 등)용.
 * AppLayout 고정 사이드 레일은 Tailwind `md`(768px)과 맞춤 — `LAYOUT_SIDEBAR_RAIL_MIN_WIDTH_PX`.
 */
export const LAYOUT_MOBILE_MAX_WIDTH_PX = 768;
export const LAYOUT_DESKTOP_MIN_WIDTH_PX = LAYOUT_MOBILE_MAX_WIDTH_PX + 1;

/** `min-width` 기준: 이 너비 이상에서 고정 사이드바 레일 표시(태블릿·데스크톱). 그 미만은 햄버거+드로어. */
export const LAYOUT_SIDEBAR_RAIL_MIN_WIDTH_PX = 768;
