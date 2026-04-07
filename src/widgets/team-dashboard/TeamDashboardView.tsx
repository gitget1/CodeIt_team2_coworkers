import type { TeamDashboardViewModel } from '@/features/group/hooks/useTeamDashboard';
import { TeamDashboardReadyView } from './TeamDashboardReadyView';
import { TeamDashboardFallbackView } from './TeamDashboardFallbackView';

type Props = {
  vm: TeamDashboardViewModel;
};

/**
 * 팀 대시보드 UI 전용. 데이터·라우팅 판별은 `useTeamDashboard`에 둔다.
 *
 * TODO(후속 작업):
 * - 팀 수정/삭제: `useUpdateGroupMutation` / `useDeleteGroupMutation` 연결. 에러는 뮤테이션 `onError`에서 토스트 처리.
 * - 멤버 초대: `getInvitationToken` + 모달, 에러도 뮤테이션/API 레이어에서 일원화.
 * - TaskBoard: `TaskBoardView`가 mock(`MOCK_TASK_BOARD`)를 쓰지 않도록 `useGroupTasksQuery` 등으로 교체한 뒤 통합 테스트.
 */
export function TeamDashboardView({ vm }: Props) {
  return vm.phase === 'ready' ? <TeamDashboardReadyView vm={vm} /> : <TeamDashboardFallbackView vm={vm} />;
}
