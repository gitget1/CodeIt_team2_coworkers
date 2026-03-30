import Head from 'next/head';
import { TeamCard } from '@/shared/ui/team/TeamCard';
import { TaskBoardView } from '@/features/task-board/ui';
import { MemberCard } from '@/shared/ui/profile';
import type { TeamDashboardViewModel } from '@/features/group/hooks/useTeamDashboard';
import { TEAM_CARD_PLACEHOLDER_STATS } from '@/features/group/constants/teamDashboardPlaceholders';
import { TeamDashboardApiLoading } from './TeamDashboardApiLoading';

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
  if (vm.phase === 'router_loading') {
    return (
      <div className="flex min-h-[50vh] flex-1 items-center justify-center text-sm text-txt-secondary">
        불러오는 중…
      </div>
    );
  }

  if (vm.phase === 'invalid_route') {
    return (
      <div className="flex min-h-[50vh] flex-1 items-center justify-center text-sm text-txt-secondary">
        올바른 팀 주소가 아닙니다. 사이드바에서 팀을 선택해 주세요.
      </div>
    );
  }

  if (vm.phase === 'group_loading') {
    return (
      <>
        <Head>
          <title>팀 | Coworkers</title>
          <meta name="description" content="팀 대시보드" />
        </Head>
        <TeamDashboardApiLoading />
      </>
    );
  }

  if (vm.phase === 'group_error') {
    return (
      <>
        <Head>
          <title>팀 | Coworkers</title>
          <meta name="description" content="팀 대시보드" />
        </Head>
        <div className="flex min-h-full flex-1 items-center justify-center bg-background-secondary p-4 text-sm text-txt-secondary md:p-6">
          팀 정보를 불러오지 못했습니다.
        </div>
      </>
    );
  }

  const { group, memberCardItems, memberImagesPreview, isFetching } = vm;

  return (
    <>
      <Head>
        <title>{`${group.name} | Coworkers`}</title>
        <meta
          name="description"
          content={`${group.name} 팀의 할 일과 멤버를 확인하세요.`}
        />
      </Head>

      <div
        className="relative flex min-h-full flex-1 flex-col gap-6 bg-background-secondary p-4 md:p-6"
        aria-busy={isFetching}
      >
        {isFetching ? (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 bg-brand-primary/70 animate-pulse"
            aria-hidden
          />
        ) : null}
        {/* TODO: 팀 수정/삭제 — 모달 + useUpdateGroupMutation / useDeleteGroupMutation. 에러 토스트는 각 뮤테이션 onError에서만 처리. */}
        <TeamCard
          teamName={group.name}
          progressPercent={TEAM_CARD_PLACEHOLDER_STATS.progressPercent}
          todayTaskCount={TEAM_CARD_PLACEHOLDER_STATS.todayTaskCount}
          completedTaskCount={TEAM_CARD_PLACEHOLDER_STATS.completedTaskCount}
          memberImages={memberImagesPreview}
          members={memberCardItems}
          memberCount={group.members.length}
          className="w-full max-w-full"
        />

        <section className="flex min-w-0 flex-col gap-4" aria-labelledby="team-task-board-heading">
          <h2 id="team-task-board-heading" className="text-lg font-bold text-txt-primary md:text-xl">
            {/* TODO: TaskBoardView — MOCK_TASK_BOARD 제거 후 그룹 taskLists·API와 매핑. 그 다음 E2E/API 테스트로 회귀 검증. */}
            할 일 목록 ({group.taskLists.length}개)
          </h2>
          <div className="min-w-0 overflow-x-auto pb-2">
            {/* TODO: onInvite — getInvitationToken + 모달. ApiError/토스트는 호출부 뮤테이션 또는 API 래퍼에서 처리. */}
            <TaskBoardView
              trailingPanel={
                <MemberCard members={memberCardItems} title="멤버" className="w-full max-w-none" />
              }
            />
          </div>
        </section>
      </div>
    </>
  );
}
