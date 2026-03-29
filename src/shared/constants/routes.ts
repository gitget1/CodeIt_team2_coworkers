/** 앱 전역 라우트 경로 정의 */
export const ROUTES = {
  FREE_BOARD: '/',
  TEAM_CREATE: '/team/create',
} as const;

/** 팀 대시보드 `/{groupId}` — URL 세그먼트는 `GET /user/groups`의 그룹 `id`와 동일한 숫자 문자열 */
export function teamDashboardPath(groupId: string) {
  return `/${encodeURIComponent(groupId)}`;
}
