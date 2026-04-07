import { useMemo } from 'react';
import { useUserGroupsQuery } from '@/features/user/hooks/useUserGroupsQuery';
import type { TeamItem } from './types';

type UseSidebarTeamItemsParams = {
  teams?: TeamItem[];
  isLoggedIn: boolean;
};

/** props 팀 목록 →(없으면) 멤버십 API 목록 (로그인 시 목데이터 fallback 제거) */
export function useSidebarTeamItems({ teams, isLoggedIn }: UseSidebarTeamItemsParams): TeamItem[] {
  const shouldFetch = isLoggedIn && teams === undefined;

  const { data: groupsData } = useUserGroupsQuery({ enabled: shouldFetch });

  const fetchedTeams = useMemo<TeamItem[] | null>(() => {
    if (!groupsData) return null;
    return groupsData.map((group) => ({
      id: String(group.id),
      label: group.name,
    }));
  }, [groupsData]);

  return useMemo(() => {
    if (teams) return teams;
    if (fetchedTeams) return fetchedTeams;
    // 로그인 상태에서는 API 응답 전 빈 목록 유지(목데이터 깜빡임 방지)
    return [];
  }, [teams, fetchedTeams]);
}
