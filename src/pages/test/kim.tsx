import { useState } from 'react';
import { AppLayout, SidebarDropdownMenu, SidebarDropdownItem } from '@/widgets/layout/Sidebar';
import Dropdown from '@/shared/ui/dropdown';
import { Profile, ProfileEdit } from '@/shared/ui/profile';
import sampleProfileImg from '@/shared/assets/images/logo-sm.png';
import { Checkbox } from '@/shared/ui/checkbox';

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
        isLoggedIn: false,
      }}
    >
      <div className="p-6 space-y-10">
        <h1 className="text-2xl font-bold text-txt-primary mb-2">테스트 페이지</h1>
        <p className="text-txt-secondary mb-6">
          사이드바·레이아웃·드롭다운 동작을 확인할 수 있습니다. 768px 이하(모바일)에서는 상단 메뉴 버튼으로 사이드바가 열립니다.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <p className="text-sm text-txt-default">
            현재 선택 팀: <strong>{selectedTeamId ?? '-'}</strong>
          </p>

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

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-txt-primary">Profile (이미지 유무)</h2>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <div className="w-14 text-xs text-txt-default">sm</div>
              <div className="flex items-center gap-6">
                <Profile size="sm" ariaLabel="sm - 이미지 없음" />
                <Profile size="sm" imageSrc={sampleProfileImg} alt="sm - 프로필 이미지" />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-14 text-xs text-txt-default">md</div>
              <div className="flex items-center gap-6">
                <Profile size="md" ariaLabel="md - 이미지 없음" />
                <Profile size="md" imageSrc={sampleProfileImg} alt="md - 프로필 이미지" />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-14 text-xs text-txt-default">lg</div>
              <div className="flex items-center gap-6">
                <Profile size="lg" ariaLabel="lg - 이미지 없음" />
                <Profile size="lg" imageSrc={sampleProfileImg} alt="lg - 프로필 이미지" />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-txt-primary">Profile Edit (이미지 교체)</h2>
          <div className="flex items-center gap-6">
            <ProfileEdit size="x-large" ariaLabel="x-large - 편집" imageSrc={null} />
            <ProfileEdit size="large" ariaLabel="large - 편집" imageSrc={sampleProfileImg} />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-txt-primary">Checkbox</h2>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <div className="w-14 text-xs text-txt-default">sm</div>
              <div className="flex items-center gap-6">
                <Checkbox size="sm" defaultChecked={false} label="sm 미체크" aria-label="sm unchecked" />
                <Checkbox size="sm" defaultChecked label="sm 체크" aria-label="sm checked" />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-14 text-xs text-txt-default">lg</div>
              <div className="flex items-center gap-6">
                <Checkbox size="lg" defaultChecked={false} label="lg 미체크" aria-label="lg unchecked" />
                <Checkbox size="lg" defaultChecked label="lg 체크" aria-label="lg checked" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
