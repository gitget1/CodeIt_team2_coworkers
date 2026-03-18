/**
 * 레이아웃(사이드바) 관련 상수.
 * 기본 메뉴 등 하드코딩 방지를 위해 여기서만 선언.
 * 경로는 @/shared/constants/routes 사용.
 */

import type { TeamItem } from './types';

/** 사이드바 기본 팀 목록 (데이터 없을 때 fallback, 실제는 features/team 등에서 주입) */
export const DEFAULT_TEAM_ITEMS: readonly TeamItem[] = [
  { id: 'team-1', label: '경영관리팀' },
  { id: 'team-2', label: '프로덕트팀' },
  { id: 'team-3', label: '마케팅팀' },
] as const;
