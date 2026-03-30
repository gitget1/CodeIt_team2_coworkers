import { useMemo } from 'react';
import { useUserGroupsQuery } from '@/features/user/hooks/useUserGroupsQuery';
import { DEFAULT_TEAM_ITEMS } from './constants';
import type { TeamItem } from './types';

type UseSidebarTeamItemsParams = {
  teams?: TeamItem[];
  isLoggedIn: boolean;
};

/** props 팀 목록 →(없으면) 멤버십 API → 기본 목록 */
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

  return useMemo(
    () => teams ?? fetchedTeams ?? [...DEFAULT_TEAM_ITEMS],
    [teams, fetchedTeams],
  );
}
