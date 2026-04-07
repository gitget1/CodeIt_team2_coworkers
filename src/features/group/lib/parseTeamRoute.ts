/**
 * `pages/[teamId]` 동적 세그먼트에서 그룹 id 파싱.
 * `router.query.teamId`는 문자열 | 문자열[] | undefined.
 */
export function parseTeamIdFromQuery(teamId: unknown): {
  groupIdStr: string | undefined;
  groupIdNum: number;
  isValidGroupId: boolean;
} {
  const raw = teamId;
  const groupIdStr =
    typeof raw === 'string' ? raw : Array.isArray(raw) ? raw[0] : undefined;
  const groupIdNum = groupIdStr !== undefined ? Number.parseInt(groupIdStr, 10) : Number.NaN;
  const isValidGroupId = Number.isFinite(groupIdNum) && groupIdNum > 0;
  return { groupIdStr, groupIdNum, isValidGroupId };
}
