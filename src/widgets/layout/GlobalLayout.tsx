import { ReactNode } from 'react';
import { AppLayout } from './Sidebar';
import { useUserQuery } from '@/features/user/hooks/useUserQuery';

interface GlobalLayoutProps {
  children: ReactNode;
}

export function GlobalLayout({ children }: GlobalLayoutProps) {
  const { data: user, isLoading } = useUserQuery();

  const isLoggedIn = isLoading ? undefined : !!user;

  return (
    <AppLayout
      sidebarProps={{
        isLoggedIn: isLoggedIn ?? false,
        selectedTeamId: null,
        onTeamSelect: (id) => console.log('팀 선택:', id),
        onAddTeam: () => console.log('팀 추가 클릭'),
        onLoginClick: () => console.log('로그인 모달 띄우기 또는 페이지 이동'),
        /**
         * TODO
         * 기능 구현은 부탁드립니다.
         */
      }}
    >
      {children}
    </AppLayout>
  );
}
