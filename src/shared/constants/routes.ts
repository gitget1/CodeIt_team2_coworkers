/** 앱 전역 라우트 경로 정의 */
export const ROUTES = {
  FREE_BOARD: '/',
  LOGIN: '/login',
  TEAM_CREATE: '/team/create',
  /** TODO(임시): 팀 참여 플로우 확정 후 사이드바 노출 여부 정리 */
  ACCEPT_INVITATION: '/accept-invitation',
} as const;

/** 팀 대시보드 `/{groupId}` — URL 세그먼트는 `GET /user/groups`의 그룹 `id`와 동일한 숫자 문자열 */
export function teamDashboardPath(groupId: string) {
  return `/${encodeURIComponent(groupId)}`;
}
