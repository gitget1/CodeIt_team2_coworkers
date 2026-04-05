import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { AppLayout } from '@/widgets/layout/Sidebar';
import { teamDashboardPath, ROUTES } from '@/shared/constants/routes';
import { parseTeamIdFromQuery } from '@/features/group/lib/parseTeamRoute';

type Props = { children: ReactElement };

export function TeamDashboardLayout({ children }: Props) {
  const router = useRouter();
  const { groupIdStr, isValidGroupId } = parseTeamIdFromQuery(router.query.teamId);

  const sidebarProps =
    !router.isReady
      ? {
          isLoggedIn: true,
          onAddTeam: () => void router.push(ROUTES.TEAM_CREATE),
        }
      : !groupIdStr || !isValidGroupId
        ? {
            isLoggedIn: true,
            onAddTeam: () => void router.push(ROUTES.TEAM_CREATE),
          }
        : {
            selectedTeamId: groupIdStr,
            onTeamSelect: (id: string) => void router.push(teamDashboardPath(id)),
            onAddTeam: () => void router.push(ROUTES.TEAM_CREATE),
            isLoggedIn: true,
          };

  return (
    <AppLayout sidebarProps={sidebarProps}>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-background-secondary [&_button]:cursor-pointer [&_button:disabled]:cursor-not-allowed">
        <div className="mx-auto flex w-full max-w-screen-2xl min-h-0 flex-1 flex-col px-4 py-6 md:px-6">
          {children}
        </div>
      </div>
    </AppLayout>
  );
}
