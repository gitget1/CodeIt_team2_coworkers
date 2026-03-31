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

  return <AppLayout sidebarProps={sidebarProps}>{children}</AppLayout>;
}
