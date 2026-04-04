import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAcceptInvitationMutation } from '@/features/group/hooks/useAcceptInvitationMutation';
import { parseInvitationToken } from '@/features/group/lib/parseInvitationToken';
import { useUserQuery } from '@/features/user/hooks/useUserQuery';
import { teamDashboardPath, ROUTES } from '@/shared/constants/routes';
import { GlobalLayout } from '@/widgets/layout/GlobalLayout';
import { FormField } from '@/shared/ui/formfield';
import { Input } from '@/shared/ui/input/Input';
import { Button } from '@/shared/ui/Button';

export default function AcceptInvitationPage() {
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useUserQuery();
  const [teamLink, setTeamLink] = useState('');

  const { mutate, isPending } = useAcceptInvitationMutation({
    onSuccess: async (data) => {
      await router.push(teamDashboardPath(String(data.groupId)));
    },
    onError: () => {},
  });

  const rawToken = router.query.token;
  const queryTokenFromRouter =
    typeof rawToken === 'string' ? rawToken : Array.isArray(rawToken) ? rawToken[0] : undefined;

  useEffect(() => {
    if (!router.isReady || !queryTokenFromRouter) return;
    setTeamLink(
      `${window.location.origin}/accept-invitation?token=${encodeURIComponent(queryTokenFromRouter)}`,
    );
  }, [router.isReady, queryTokenFromRouter]);

  const postLoginRedirectPath = (): string => {
    const token = queryTokenFromRouter ?? parseInvitationToken(teamLink);
    if (token) {
      return `${ROUTES.ACCEPT_INVITATION}?token=${encodeURIComponent(token)}`;
    }
    return ROUTES.ACCEPT_INVITATION;
  };

  const handleJoin = () => {
    const invitationToken = parseInvitationToken(teamLink);
    if (!invitationToken) {
      toast.error('팀 링크를 확인해 주세요.');
      return;
    }
    if (!user?.email) {
      toast.error('로그인 후 팀에 참여할 수 있습니다.');
      void router.push({
        pathname: ROUTES.LOGIN,
        query: { redirect: postLoginRedirectPath() },
      });
      return;
    }

    mutate({
      body: {
        userEmail: user.email,
        token: invitationToken,
      },
    });
  };

  return (
    <>
      <Head>
        <title>팀 참여하기 | Coworkers</title>
        <meta name="description" content="공유받은 팀 링크로 팀에 참여합니다." />
      </Head>

      <div className="flex min-h-full flex-1 items-center justify-center bg-background-secondary p-4 md:p-6">
        <section className="w-full max-w-[420px] rounded-2xl border border-background-tertiary bg-background-primary p-6 shadow-sm md:p-8">
          <h1 className="text-xl font-bold tracking-tight text-txt-primary">팀 참여하기</h1>

          <form
            className="mt-8 flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleJoin();
            }}
            noValidate
          >
            <FormField className="gap-2">
              <FormField.Label className="text-sm font-medium text-txt-secondary">
                팀 링크
              </FormField.Label>
              <FormField.Control>
                <Input
                  type="text"
                  name="teamLink"
                  autoComplete="off"
                  placeholder="팀 링크를 입력해주세요."
                  value={teamLink}
                  onChange={(e) => setTeamLink(e.target.value)}
                  className="rounded-[10px] placeholder:text-md placeholder:font-normal placeholder:text-txt-default"
                />
              </FormField.Control>
            </FormField>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isPending || isUserLoading}
              className="h-12 w-full rounded-[10px] text-base font-bold"
            >
              {isPending ? '참여 중...' : '참여하기'}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-txt-secondary">
            공유받은 팀 링크를 입력해 참여할 수 있어요.
          </p>
        </section>
      </div>
    </>
  );
}

AcceptInvitationPage.getLayout = function getLayout(page: ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};
