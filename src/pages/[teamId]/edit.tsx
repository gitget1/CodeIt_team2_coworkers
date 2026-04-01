import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { parseTeamIdFromQuery } from '@/features/group/lib/parseTeamRoute';
import { useGroupQuery } from '@/features/group/hooks/useGroupQuery';
import { useUserQuery } from '@/features/user/hooks/useUserQuery';
import { useUpdateGroupMutation } from '@/features/group/hooks/useUpdateGroupMutation';
import { TeamEditCard } from '@/shared/ui/team/TeamEditCard';
import { TeamDashboardLayout } from '@/widgets/team-dashboard/TeamDashboardLayout';
import { ROUTES, teamDashboardPath } from '@/shared/constants/routes';

export default function TeamEditPage() {
  const router = useRouter();
  const { groupIdStr, groupIdNum, isValidGroupId } = parseTeamIdFromQuery(router.query.teamId);
  const { data: me, isPending: isUserLoading } = useUserQuery();
  const { data: group, isPending: isGroupLoading, isError } = useGroupQuery(
    router.isReady && isValidGroupId ? groupIdNum : Number.NaN,
  );
  const { mutateAsync } = useUpdateGroupMutation();

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

  return (
    <>
      <Head>
        <title>팀 수정하기 | Coworkers</title>
        <meta name="description" content="팀 이름을 수정합니다." />
      </Head>

      <div className="box-border flex min-h-full flex-1 flex-col items-center justify-center overflow-y-auto bg-[#F4F7F9] px-4 py-8 sm:px-6">
        <TeamEditCard
          className="shrink-0"
          defaultName={group.name}
          onSubmit={async ({ name }) => {
            const trimmed = name.trim();
            if (!trimmed) {
              toast.error('팀 이름을 입력해주세요.');
              return;
            }
            try {
              await mutateAsync({
                groupId: group.id,
                body: { name: trimmed },
              });
              toast.success('팀 정보가 수정되었습니다.');
              await router.push(teamDashboardPath(String(group.id)));
            } catch (e) {
              const err = e as { message?: string };
              toast.error(err?.message ?? '팀 수정에 실패했습니다.');
            }
          }}
        />
      </div>
    </>
  );
}

TeamEditPage.getLayout = function getLayout(page: ReactElement) {
  return <TeamDashboardLayout>{page}</TeamDashboardLayout>;
};
