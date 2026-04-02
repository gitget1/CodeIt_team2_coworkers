import { useEffect, useMemo } from 'react';
import type { NextRouter } from 'next/router';
import type { GroupDetail } from '../model/entities/group.model';
import type { UserProfile } from '@/features/user/model/entities/user.model';
import { ROUTES, teamDashboardPath } from '@/shared/constants/routes';

type Params = {
  router: NextRouter;
  group: GroupDetail | undefined;
  me: UserProfile | null | undefined;
  isUserLoading: boolean;
};

/**
 * 팀 수정 페이지: 로그인·관리자 여부에 따라 다른 경로로 보냅니다.
 */
export function useTeamEditPageGuard({ router, group, me, isUserLoading }: Params) {
  const isAdmin = useMemo(() => {
    if (!group || me == null) return false;
    return group.members.some((m) => m.userId === me.id && m.role === 'ADMIN');
  }, [group, me]);

  useEffect(() => {
    if (!router.isReady || !group || isUserLoading) return;
    if (me === null) {
      void router.replace(ROUTES.FREE_BOARD);
      return;
    }
    if (!isAdmin) {
      void router.replace(teamDashboardPath(String(group.id)));
    }
  }, [router, group, me, isUserLoading, isAdmin]);

  return { isAdmin };
}
