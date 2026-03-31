import Head from 'next/head';
import { TeamCard } from '@/shared/ui/team/TeamCard';
import { MemberCard } from '@/shared/ui/profile';
import { TaskBoardView } from '@/features/task-board/ui';
import { TEAM_CARD_PLACEHOLDER_STATS } from '@/features/group/constants/teamDashboardPlaceholders';
import type { TeamDashboardViewModel } from '@/features/group/hooks/useTeamDashboard';
import { useUserQuery } from '@/features/user/hooks/useUserQuery';
import { useTeamDashboardMemberActions } from './useTeamDashboardMemberActions';
import { TeamDashboardInviteModal } from './TeamDashboardInviteModal';
import { TeamDashboardRemoveMemberModal } from './TeamDashboardRemoveMemberModal';

type ReadyVm = Extract<TeamDashboardViewModel, { phase: 'ready' }>;

type Props = {
  vm: ReadyVm;
};

export function TeamDashboardReadyView({ vm }: Props) {
  const { group, memberCardItems, memberImagesPreview, isFetching } = vm;
  const { data: me } = useUserQuery();
  const {
    isInviteModalOpen,
    openInviteModal,
    closeInviteModal,
    isRemoveMemberModalOpen,
    openRemoveMemberModal,
    closeRemoveMemberModal,
    isCopyingInviteLink,
    isRemovingMember,
    memberToRemove,
    handleCopyInviteLink,
    handleRemoveMemberRequest,
    handleConfirmRemoveMember,
  } = useTeamDashboardMemberActions({ groupId: group.id });
  const myMembership = group.members.find((member) => member.userId === me?.id);
  const canManageMembers = myMembership?.role === 'ADMIN';

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
            <TaskBoardView
              trailingPanel={
                <MemberCard
                  members={memberCardItems}
                  title="멤버"
                  onInvite={openInviteModal}
                  canManageMembers={canManageMembers}
                  currentUserId={me ? String(me.id) : undefined}
                  onRemoveMember={handleRemoveMemberRequest}
                  className="w-full max-w-none"
                />
              }
            />
          </div>
        </section>
      </div>

      <TeamDashboardInviteModal
        isOpen={isInviteModalOpen}
        open={openInviteModal}
        close={closeInviteModal}
        isCopyingInviteLink={isCopyingInviteLink}
        onCopyInviteLink={handleCopyInviteLink}
      />

      <TeamDashboardRemoveMemberModal
        isOpen={isRemoveMemberModalOpen}
        open={openRemoveMemberModal}
        close={closeRemoveMemberModal}
        memberToRemove={memberToRemove}
        isRemovingMember={isRemovingMember}
        onConfirmRemoveMember={handleConfirmRemoveMember}
      />
    </>
  );
}
