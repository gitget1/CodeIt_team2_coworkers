import { ReactNode, useMemo } from 'react';
import { useRouter } from 'next/router';
import { AppLayout } from './Sidebar';
import { useUserQuery } from '@/features/user/hooks/useUserQuery';
import { teamDashboardPath, ROUTES } from '@/shared/constants/routes';

interface GlobalLayoutProps {
  children: ReactNode;
}

export function GlobalLayout({ children }: GlobalLayoutProps) {
  const router = useRouter();
  const { data: user, isLoading } = useUserQuery();

  const isLoggedIn = isLoading ? undefined : !!user;

  const selectedTeamId = useMemo(() => {
    if (!router.isReady || router.pathname !== '/[teamId]') return null;
    const raw = router.query.teamId;
    return typeof raw === 'string' ? raw : Array.isArray(raw) ? raw[0] ?? null : null;
  }, [router.isReady, router.pathname, router.query.teamId]);

  return (
    <AppLayout
      sidebarProps={{
        isLoggedIn: isLoggedIn ?? false,
        selectedTeamId,
        onTeamSelect: (id) => void router.push(teamDashboardPath(id)),
        onAddTeam: () => void router.push(ROUTES.TEAM_CREATE),
        onLoginClick: () => void router.push('/login'),
      }}
    >
      {children}
    </AppLayout>
  );
}
