import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { AppLayout } from '@/widgets/layout/Sidebar';
import { TeamCard } from '@/shared/ui/team/TeamCard';
import { TaskBoardView } from '@/features/task-board/ui';
import { MemberCard } from '@/shared/ui/profile';
import type { MemberCardItem } from '@/shared/ui/profile';
import { MOCK_TASK_BOARD } from '@/features/task-board/lib/mockData';
import type { TaskBoard } from '@/features/task-board/model/taskBoard.types';
import { teamDashboardPath, ROUTES } from '@/shared/constants/routes';
import { useGroupQuery } from '@/features/group/hooks/useGroupQuery';
import type { GroupMember } from '@/features/group/model/entities/group.model';

function countTaskGroups(board: TaskBoard): number {
  return board.columns.reduce((sum, col) => sum + col.taskGroups.length, 0);
}

const TASK_LIST_COUNT = countTaskGroups(MOCK_TASK_BOARD);

function groupMembersToCardItems(members: GroupMember[]): MemberCardItem[] {
  return members.map((m) => ({
    id: String(m.userId),
    name: m.userName,
    email: m.userEmail,
    imageSrc: m.userImage ?? undefined,
  }));
}

export default function TeamDashboardPage() {
  const router = useRouter();
  const rawId = router.query.teamId;
  const groupIdStr =
    typeof rawId === 'string' ? rawId : Array.isArray(rawId) ? rawId[0] : undefined;
  const groupIdNum = groupIdStr !== undefined ? Number.parseInt(groupIdStr, 10) : Number.NaN;
  const isValidGroupId = Number.isFinite(groupIdNum) && groupIdNum > 0;

  const { data: group, isLoading, isError } = useGroupQuery(groupIdNum);

  const memberCardItems = useMemo(
    () => (group ? groupMembersToCardItems(group.members) : []),
    [group],
  );

  const memberImagesPreview = useMemo(() => {
    return group?.members
      .slice(0, 3)
      .map((m) => m.userImage)
      .filter((url): url is string => url != null && url.length > 0);
  }, [group]);

  if (!router.isReady) {
    return (
      <AppLayout
        sidebarProps={{
          isLoggedIn: true,
          onAddTeam: () => void router.push(ROUTES.TEAM_CREATE),
        }}
      >
        <div className="flex min-h-[50vh] flex-1 items-center justify-center text-sm text-txt-secondary">
          불러오는 중…
        </div>
      </AppLayout>
    );
  }

  if (!groupIdStr || !isValidGroupId) {
    return (
      <AppLayout sidebarProps={{ isLoggedIn: true, onAddTeam: () => void router.push(ROUTES.TEAM_CREATE) }}>
        <div className="flex min-h-[50vh] flex-1 items-center justify-center text-sm text-txt-secondary">
          올바른 팀 주소가 아닙니다. 사이드바에서 팀을 선택해 주세요.
        </div>
      </AppLayout>
    );
  }

  return (
    <>
      <Head>
        <title>{group?.name ? `${group.name} | Coworkers` : '팀 | Coworkers'}</title>
        <meta
          name="description"
          content={group?.name ? `${group.name} 팀의 할 일과 멤버를 확인하세요.` : '팀 대시보드'}
        />
      </Head>

      <AppLayout
        sidebarProps={{
          selectedTeamId: groupIdStr,
          onTeamSelect: (id) => void router.push(teamDashboardPath(id)),
          onAddTeam: () => void router.push(ROUTES.TEAM_CREATE),
          isLoggedIn: true,
        }}
      >
        {isLoading ? (
          <div className="flex min-h-[50vh] flex-1 items-center justify-center text-sm text-txt-secondary">
            팀 정보를 불러오는 중…
          </div>
        ) : isError || !group ? (
          <div className="flex min-h-[50vh] flex-1 items-center justify-center text-sm text-txt-secondary">
            팀 정보를 불러오지 못했습니다.
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-6 bg-background-secondary p-4 md:p-6">
            <TeamCard
              teamName={group.name}
              progressPercent={25}
              todayTaskCount={20}
              completedTaskCount={5}
              memberImages={memberImagesPreview}
              members={memberCardItems}
              memberCount={group.members.length}
              onEditTeam={() => alert('팀 수정')}
              onDeleteTeam={() => alert('팀 삭제')}
              className="w-full max-w-full"
            />

            <section className="flex min-w-0 flex-col gap-4" aria-labelledby="team-task-board-heading">
              <h2 id="team-task-board-heading" className="text-lg font-bold text-txt-primary md:text-xl">
                할 일 목록 ({TASK_LIST_COUNT}개)
              </h2>
              <div className="min-w-0 overflow-x-auto pb-2">
                <TaskBoardView
                  trailingPanel={
                    <MemberCard
                      members={memberCardItems}
                      title="멤버"
                      onInvite={() => alert('멤버 초대')}
                      className="w-full max-w-none"
                    />
                  }
                />
              </div>
            </section>
          </div>
        )}
      </AppLayout>
    </>
  );
}
