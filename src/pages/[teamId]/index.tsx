import { ReactElement } from 'react';
import { useTeamDashboard } from '@/features/group/hooks/useTeamDashboard';
import { TeamDashboardLayout } from '@/widgets/team-dashboard/TeamDashboardLayout';
import { TeamDashboardView } from '@/widgets/team-dashboard/TeamDashboardView';

export default function TeamDashboardPage() {
  const vm = useTeamDashboard();
  return <TeamDashboardView vm={vm} />;
}

TeamDashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <TeamDashboardLayout>{page}</TeamDashboardLayout>;
};
