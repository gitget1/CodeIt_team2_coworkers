import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { parseTeamIdFromQuery } from '@/features/group/lib/parseTeamRoute';
import { useGroupQuery } from '@/features/group/hooks/useGroupQuery';
import { useUserQuery } from '@/features/user/hooks/useUserQuery';
import { useTeamEditPageGuard } from '@/features/group/hooks/useTeamEditPageGuard';
import { TeamEditPageContent } from '@/features/group/ui/TeamEditPageContent';
import { TeamDashboardLayout } from '@/widgets/team-dashboard/TeamDashboardLayout';

export default function TeamEditPage() {
  const router = useRouter();
  const { groupIdStr, groupIdNum, isValidGroupId } = parseTeamIdFromQuery(router.query.teamId);
  const shouldFetchGroup = router.isReady && isValidGroupId;
  const safeGroupId = isValidGroupId ? groupIdNum : 0;

  const { data: me, isPending: isUserLoading } = useUserQuery();
  const { data: group, isPending: isGroupLoading, isError } = useGroupQuery(safeGroupId, {
    enabled: shouldFetchGroup,
  });

  const { isAdmin } = useTeamEditPageGuard({ router, group, me, isUserLoading });

  if (!router.isReady || !groupIdStr || !isValidGroupId) {
    return null;
  }

  if (isGroupLoading || isUserLoading) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center bg-[#F4F7F9] px-4 py-8 sm:px-6">
        <p className="text-sm text-txt-secondary">불러오는 중…</p>
      </div>
    );
  }

  if (isError || group === undefined) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center bg-[#F4F7F9] px-4 py-8 sm:px-6">
        <p className="text-sm text-txt-secondary">팀 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  if (me === null || !isAdmin) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center bg-[#F4F7F9] px-4 py-8 sm:px-6">
        <p className="text-sm text-txt-secondary">이동 중…</p>
      </div>
    );
  }

  return <TeamEditPageContent group={group} />;
}

TeamEditPage.getLayout = function getLayout(page: ReactElement) {
  return <TeamDashboardLayout>{page}</TeamDashboardLayout>;
};
