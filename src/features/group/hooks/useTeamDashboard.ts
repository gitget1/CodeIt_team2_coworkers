import { useRouter } from 'next/router';
import type { GroupDetail } from '../model/entities/group.model';
import { useGroupQuery } from './useGroupQuery';
import { groupMembersToMemberCardItems } from '../lib/mappers/groupMembersToMemberCardItems';
import type { MemberCardItem } from '@/shared/ui/profile';
import { parseTeamIdFromQuery } from '../lib/parseTeamRoute';

export type TeamDashboardViewModel =
  | { phase: 'router_loading' }
  | { phase: 'invalid_route' }
  | { phase: 'group_loading'; groupIdStr: string }
  | { phase: 'group_error'; groupIdStr: string }
  | {
      phase: 'ready';
      groupIdStr: string;
      group: GroupDetail;
      memberCardItems: MemberCardItem[];
      /** 백그라운드 재검증(refetch) 중 */
      isFetching: boolean;
    };

/**
 * 팀 대시보드 도메인 상태: 라우트 → 그룹 조회 → 멤버 UI 모델까지.
 *
 * 에러 표시 정책:
 * - Query(`useGroupQuery`): React Query가 `ApiError`를 유지하며, 전역 인터셉터/Query 캐시와 맞물림.
 *   UI는 `phase === 'group_error'`일 때 짧은 폴백 문구만 쓰고, 세부 메시지는 인터셉터·토스트 일원화를 전제로 함.
 * - Mutation(팀 수정/삭제/초대 등): `onError`에서 토스트 등 처리하고, 화면은 성공 시 invalidate/refetch에만 반응하는 편이
 *   중복 알림을 줄임. (추가 시 해당 뮤테이션 훅에 구현)
 */
export function useTeamDashboard(): TeamDashboardViewModel {
  const router = useRouter();
  const { groupIdStr, groupIdNum, isValidGroupId } = parseTeamIdFromQuery(router.query.teamId);

  const shouldFetchGroup = router.isReady && isValidGroupId;
  const safeGroupId = isValidGroupId ? groupIdNum : 0;
  const {
    data: group,
    isPending,
    isFetching,
    isError,
  } = useGroupQuery(safeGroupId, {
    enabled: shouldFetchGroup,
  });

  if (!router.isReady) {
    return { phase: 'router_loading' };
  }

  if (!groupIdStr || !isValidGroupId) {
    return { phase: 'invalid_route' };
  }

  if (isPending) {
    return { phase: 'group_loading', groupIdStr };
  }

  if (isError || group === undefined) {
    return { phase: 'group_error', groupIdStr };
  }

  return {
    phase: 'ready',
    groupIdStr,
    group,
    memberCardItems: groupMembersToMemberCardItems(group.members),
    isFetching,
  };
}
