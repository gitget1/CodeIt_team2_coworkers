import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useAcceptInvitationMutation } from '@/features/group/hooks/useAcceptInvitationMutation';
import { useUserQuery } from '@/features/user/hooks/useUserQuery';
import { teamDashboardPath, ROUTES } from '@/shared/constants/routes';
import { GlobalLayout } from '@/widgets/layout/GlobalLayout';
import { USER_QUERY_KEYS } from '@/features/user/lib/queryKeys';

export default function AcceptInvitationPage() {
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useUserQuery();
  const { mutateAsync, isPending } = useAcceptInvitationMutation();
  const queryClient = useQueryClient();

  const rawToken = router.query.token;
  const token = typeof rawToken === 'string' ? rawToken : Array.isArray(rawToken) ? rawToken[0] : undefined;

  const handleAcceptInvitation = async () => {
    if (!token) {
      toast.error('초대 토큰이 올바르지 않습니다.');
      return;
    }
    if (!user?.email) {
      toast.error('로그인 후 초대를 수락할 수 있습니다.');
      void router.push(ROUTES.FREE_BOARD);
      return;
    }

    try {
      const result = await mutateAsync({
        body: {
          userEmail: user.email,
          token,
        },
      });
      toast.success('팀 초대 수락이 완료되었습니다.');

      // 사이드바의 그룹 목록(useUserGroupsQuery) 캐시를 무효화해서 즉시 갱신
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.groups() });

      await router.push(teamDashboardPath(String(result.groupId)));
    } catch (error) {
      const err = error as { message?: string };
      toast.error(err?.message ?? '초대 수락에 실패했습니다.');
    }
  };

  return (
    <>
      <Head>
        <title>팀 초대 수락 | Coworkers</title>
        <meta name="description" content="팀 초대를 수락하고 그룹에 합류합니다." />
      </Head>

      <div className="flex min-h-full flex-1 items-center justify-center bg-background-secondary p-4 md:p-6">
        <section className="w-full max-w-[420px] rounded-2xl border border-background-tertiary bg-background-primary p-6 shadow-sm">
          <h1 className="text-lg font-bold text-txt-primary">팀 초대 수락</h1>
          <p className="mt-2 text-sm text-txt-secondary">
            {token ? '초대 링크를 확인했습니다. 아래 버튼으로 수락해 주세요.' : '유효한 초대 링크가 아닙니다.'}
          </p>

          {user?.email && (
            <p className="mt-2 text-xs text-txt-secondary">
              수락 계정: <span className="font-medium text-txt-primary">{user.email}</span>
            </p>
          )}

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={handleAcceptInvitation}
              disabled={!token || !user?.email || isPending || isUserLoading}
              className="h-11 w-full rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? '수락 중...' : '초대 수락하기'}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

AcceptInvitationPage.getLayout = function getLayout(page: ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};

