import { useState } from 'react';
import { AppLayout, SidebarDropdownMenu, SidebarDropdownItem } from '@/widgets/layout/Sidebar';
import Dropdown from '@/shared/ui/dropdown';

export default function TestPage() {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>('team-1');

  const handleEdit = () => alert('수정 클릭');
  const handleRemove = () => alert('삭제 클릭');

  return (
    <AppLayout
      sidebarProps={{
        selectedTeamId,
        onTeamSelect: setSelectedTeamId,
        onAddTeam: () => alert('팀 추가하기'),
        isLoggedIn: true,
      }}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-txt-primary mb-2">테스트 페이지</h1>
        <p className="text-txt-secondary mb-6">
          사이드바·레이아웃·드롭다운 동작을 확인할 수 있습니다. 375px 이하에서는 상단 메뉴 버튼으로 사이드바가 열립니다.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <p className="text-sm text-txt-default">현재 선택 팀: <strong>{selectedTeamId ?? '-'}</strong></p>

          <Dropdown>
            <Dropdown.Trigger className="rounded-lg border border-[var(--color-border-primary)] bg-background-primary px-4 py-2 text-sm font-medium text-txt-primary hover:bg-background-tertiary">
              사이드바 스타일 드롭다운
            </Dropdown.Trigger>
            <SidebarDropdownMenu align="left">
              <SidebarDropdownItem onClick={handleEdit}>수정</SidebarDropdownItem>
              <SidebarDropdownItem onClick={handleRemove}>삭제</SidebarDropdownItem>
            </SidebarDropdownMenu>
          </Dropdown>
        </div>
      </div>
    </AppLayout>
  );
}