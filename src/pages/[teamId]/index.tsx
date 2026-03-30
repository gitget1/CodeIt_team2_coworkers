import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppLayout } from '@/widgets/layout/Sidebar';
import { TeamCard } from '@/shared/ui/team/TeamCard';
import { TaskBoardView } from '@/features/task-board/ui';
import { MemberCard } from '@/shared/ui/profile';
import { teamDashboardPath, ROUTES } from '@/shared/constants/routes';
import { useGroupQuery } from '@/features/group/hooks/useGroupQuery';
import {
  groupMembersToMemberCardItems,
  groupMembersToMemberImagePreview,
} from '@/features/group/lib/mappers/groupMembersToMemberCardItems';

export default function TeamDashboardPage() {
  const router = useRouter();
  const rawId = router.query.teamId;
  const groupIdStr =
    typeof rawId === 'string' ? rawId : Array.isArray(rawId) ? rawId[0] : undefined;
  const groupIdNum = groupIdStr !== undefined ? Number.parseInt(groupIdStr, 10) : Number.NaN;
  const isValidGroupId = Number.isFinite(groupIdNum) && groupIdNum > 0;

  // router.isReady 전에는 groupId가 undefined일 수 있어, API 호출은 가능할 때만 수행
  const shouldFetchGroup = router.isReady && isValidGroupId;
  const { data: group, isLoading, isError } = useGroupQuery(
    shouldFetchGroup ? groupIdNum : Number.NaN,
  );

  const memberCardItems = group ? groupMembersToMemberCardItems(group.members) : [];
  const memberImagesPreview = group
    ? groupMembersToMemberImagePreview(group.members, 3)
    : [];

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
            // TODO: taskLists 기반으로 todayTaskCount/completedTaskCount/progressPercent 산출 필요
            <TeamCard
              teamName={group.name}
              progressPercent={25}
              todayTaskCount={20}
              completedTaskCount={5}
              memberImages={memberImagesPreview}
              members={memberCardItems}
              memberCount={group.members.length}
              onEditTeam={() => {
                // TODO: 팀 수정 UI/뮤테이션 연결 후 toast/snackbar로 교체
                alert('팀 수정');
              }}
              onDeleteTeam={() => {
                // TODO: 팀 삭제 UI/뮤테이션 연결 후 확인 모달/에러처리 적용
                alert('팀 삭제');
              }}
              className="w-full max-w-full"
            />

            <section className="flex min-w-0 flex-col gap-4" aria-labelledby="team-task-board-heading">
              <h2 id="team-task-board-heading" className="text-lg font-bold text-txt-primary md:text-xl">
                {/* TODO: TaskBoardView의 taskGroup/TaskList 매핑이 정리되면 mockData 제거 */}
                할 일 목록 ({group.taskLists.length}개)
              </h2>
              <div className="min-w-0 overflow-x-auto pb-2">
                <TaskBoardView
                  trailingPanel={
                    <MemberCard
                      members={memberCardItems}
                      title="멤버"
                      onInvite={() => {
                        // TODO: 멤버 초대 API/인비테이션 플로우 연결
                        alert('멤버 초대');
                      }}
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
