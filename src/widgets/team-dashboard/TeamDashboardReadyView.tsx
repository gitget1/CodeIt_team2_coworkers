import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { TeamCard } from '@/shared/ui/team/TeamCard';
import { MemberCard } from '@/shared/ui/profile';
import { TaskBoardView } from '@/features/task-board/ui';
import type { TeamDashboardViewModel } from '@/features/group/hooks/useTeamDashboard';
import { useGroupTasksQuery } from '@/features/group/hooks/useGroupTasksQuery';
import { useUserQuery } from '@/features/user/hooks/useUserQuery';
import { getTaskList } from '@/features/task/api/getTaskList';
import { TASK_QUERY_KEYS } from '@/features/task/lib/queryKeys';
import { useTeamDashboardTaskListActions } from './useTeamDashboardTaskListActions';
import { useTeamDashboardInviteActions } from './useTeamDashboardInviteActions';
import { useTeamDashboardRemoveMemberActions } from './useTeamDashboardRemoveMemberActions';
import { TeamDashboardInviteModal } from './TeamDashboardInviteModal';
import { TeamDashboardRemoveMemberModal } from './TeamDashboardRemoveMemberModal';
import { TeamDashboardDeleteTeamModal } from './TeamDashboardDeleteTeamModal';
import { TeamDashboardLeaveTeamModal } from './TeamDashboardLeaveTeamModal';
import { useTeamDashboardGroupActions } from './useTeamDashboardGroupActions';
import { toTaskBoard } from './taskBoardAdapter';

const ENABLE_TASK_BOARD_CARD_NAV_TO_LIST = true;

type ReadyVm = Extract<TeamDashboardViewModel, { phase: 'ready' }>;

type Props = {
  vm: ReadyVm;
};

export function TeamDashboardReadyView({ vm }: Props) {
  const router = useRouter();
  const { groupIdStr, group, memberCardItems, isFetching } = vm;
  const { data: groupTasks = [] } = useGroupTasksQuery(group.id);
  const { data: me } = useUserQuery();
  const { handleCreateTaskGroup, handleUpdateTaskGroup, handleDeleteTaskGroup, handleToggleTask, handleCompleteTaskGroupByDrop } =
    useTeamDashboardTaskListActions({ groupId: group.id });
  const {
    isInviteModalOpen,
    openInviteModal,
    closeInviteModal,
    isCopyingInviteLink,
    handleCopyInviteLink,
  } = useTeamDashboardInviteActions({ groupId: group.id });

  const {
    isRemoveMemberModalOpen,
    openRemoveMemberModal,
    closeRemoveMemberModal,
    isRemovingMember,
    memberToRemove,
    handleRemoveMemberRequest,
    handleConfirmRemoveMember,
  } = useTeamDashboardRemoveMemberActions({ groupId: group.id });
  const myMembership = group.members.find((member) => member.userId === me?.id);
  const canManageMembers = myMembership?.role === 'ADMIN';
  const todayTaskCount = groupTasks.length;
  const completedTaskCount = groupTasks.filter((task) => task.isCompleted).length;
  const progressPercent = todayTaskCount > 0 ? Math.round((100 * completedTaskCount) / todayTaskCount) : 0;
  const taskListQueries = useQueries({
    queries: group.taskLists.map((taskList) => ({
      queryKey: TASK_QUERY_KEYS.list({ groupId: group.id, taskListId: taskList.id }),
      queryFn: () => getTaskList({ groupId: group.id, taskListId: taskList.id }),
      enabled: Boolean(group.id),
    })),
  });
  const boardTaskLists = useMemo(
    () =>
      group.taskLists.map((taskList, index) => ({
        ...taskList,
        tasks: taskListQueries[index]?.data?.tasks ?? taskList.tasks,
      })),
    [group.taskLists, taskListQueries],
  );
  const initialBoard = useMemo(() => toTaskBoard(boardTaskLists), [boardTaskLists]);
  const handleOpenTaskList = ENABLE_TASK_BOARD_CARD_NAV_TO_LIST
    ? (taskGroupId: string) => {
        void router.push(
          `/${encodeURIComponent(groupIdStr)}/task-lists/${encodeURIComponent(taskGroupId)}`,
        );
      }
    : undefined;

  const {
    deleteModal,
    leaveModal,
    isDeleting,
    isLeaving,
    handleEditTeam,
    handleOpenDeleteTeam,
    handleOpenLeaveTeam,
    handleConfirmDeleteTeam,
    handleConfirmLeaveTeam,
  } = useTeamDashboardGroupActions({
    groupId: group.id,
    currentUserId: me?.id,
  });

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
        {...(isFetching ? { 'aria-busy': true as const } : {})}
      >
        {isFetching ? (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 bg-brand-primary/70 animate-pulse"
            aria-hidden
          />
        ) : null}
        <TeamCard
          teamName={group.name}
          progressPercent={progressPercent}
          todayTaskCount={todayTaskCount}
          completedTaskCount={completedTaskCount}
          members={memberCardItems}
          memberCount={group.members.length}
          className="w-full max-w-full"
          teamMenuMode={canManageMembers ? 'admin' : 'member'}
          onEditTeam={handleEditTeam}
          onDeleteTeam={handleOpenDeleteTeam}
          onLeaveTeam={handleOpenLeaveTeam}
          onInvite={openInviteModal}
          canManageMembers={canManageMembers}
        />

        <section className="flex min-w-0 flex-col gap-4" aria-labelledby="team-task-board-heading">
          <h2 id="team-task-board-heading" className="text-lg font-bold text-txt-primary md:text-xl">
            할 일 목록 ({group.taskLists.length}개)
          </h2>
          <div className="min-w-0 overflow-x-auto pb-2">
            <TaskBoardView
              initialBoard={initialBoard}
              onCreateTaskGroup={handleCreateTaskGroup}
              onToggleTask={handleToggleTask}
              onCompleteTaskGroupByDrop={handleCompleteTaskGroupByDrop}
              onUpdateTaskGroup={handleUpdateTaskGroup}
              onDeleteTaskGroup={handleDeleteTaskGroup}
              onOpenTaskList={handleOpenTaskList}
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

      <TeamDashboardDeleteTeamModal
        isOpen={deleteModal.isOpen}
        open={deleteModal.open}
        close={deleteModal.close}
        teamName={group.name}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDeleteTeam}
      />

      <TeamDashboardLeaveTeamModal
        isOpen={leaveModal.isOpen}
        open={leaveModal.open}
        close={leaveModal.close}
        teamName={group.name}
        isLeaving={isLeaving}
        onConfirm={handleConfirmLeaveTeam}
      />
    </>
  );
}
