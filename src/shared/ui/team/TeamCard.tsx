import { useMemo } from 'react';
import { cn } from '@/shared/lib/cn';
import { Profile } from '@/shared/ui/profile';
import type { ImageAsset } from '@/shared/ui/profile';
import type { MemberCardItem } from '@/shared/ui/profile';
import { MemberCardModal } from '@/shared/ui/profile/MemberCardModal';
import { sortMembersAdminsFirst } from '@/shared/ui/profile/lib/memberCard.utils';
import { useMemberCardModalState } from '@/shared/ui/profile/useMemberCardModalState';
import { IconGear } from '@/shared/ui/icons/IconGear';
import Dropdown from '@/shared/ui/dropdown';
import { ICON_SIZE } from '@/shared/constants/icon';
import { TeamCardProgressRow } from './TeamCardProgressRow';
import { TeamCardStatsSection } from './TeamCardStatsSection';
import { TeamCardDropdownMenu } from './TeamCardDropdownMenu';
import {
  TEAM_CARD_DROPDOWN_PANEL_CLASS,
  TEAM_CARD_DROPDOWN_PANEL_CLASS_MEMBER,
  TEAM_CARD_MENU_ITEM_CLASS,
} from './teamCard.constants';

export type TeamCardTeamMenuMode = 'admin' | 'member';

export type TeamCardProps = {
  teamName: string;
  /** 0–100 */
  progressPercent: number;
  todayTaskCount: number;
  completedTaskCount: string | number;
  /** admin: 수정·삭제, member: 팀 탈퇴만 */
  teamMenuMode?: TeamCardTeamMenuMode;
  onEditTeam?: () => void;
  onDeleteTeam?: () => void;
  /** `teamMenuMode === 'member'`일 때 */
  onLeaveTeam?: () => void;
  /** 팀원 프로필 이미지(최대 3개 노출) */
  memberImages?: ImageAsset[];
  /** 모바일/태블릿에서 열리는 전체 멤버 목록 */
  members?: MemberCardItem[];
  /** 팀원 수 표기(예: 4) */
  memberCount?: number;
  /** 기본: 모바일 375x196, 태블릿 620x239, 데스크톱 1120x239 */
  className?: string;
  /** 통계 블록(오늘의 할 일·완료) 래퍼 커스텀 */
  statsClassName?: string;
};

export function TeamCard({
  teamName,
  progressPercent,
  todayTaskCount,
  completedTaskCount,
  teamMenuMode = 'admin',
  onEditTeam,
  onDeleteTeam,
  onLeaveTeam,
  memberImages = [],
  members,
  memberCount,
  className,
  statsClassName,
}: TeamCardProps) {
  const normalizedMembers = useMemo<MemberCardItem[]>(
    () =>
      members && members.length > 0
        ? members
        : memberImages.map((imageSrc, idx) => ({
            id: `team-member-${idx + 1}`,
            name: `멤버 ${idx + 1}`,
            imageSrc,
          })),
    [memberImages, members],
  );

  const sortedMembers = useMemo(
    () => sortMembersAdminsFirst(normalizedMembers),
    [normalizedMembers],
  );

  const {
    isOpen: isMemberModalOpen,
    open: openMemberModal,
    modalMode: memberModalMode,
    selectedMember: memberModalSelected,
    memberDetailFromAllList,
    onMemberClickInList,
    onBackToList,
    onMoreClick,
    onModalClose,
  } = useMemberCardModalState({ defaultModeOnClose: 'all' });

  const visibleMemberImages = memberImages.slice(0, 3);
  const showMemberSummary = visibleMemberImages.length > 0 || normalizedMembers.length > 0 || typeof memberCount === 'number';

  return (
    <article
      className={cn(
        'relative box-border flex h-[196px] w-[375px] max-w-full flex-col rounded-[20px] border border-background-tertiary/60 bg-background-primary p-5 shadow-[0_4px_24px_rgba(15,23,42,0.06)] md:h-[239px] md:w-[620px] lg:w-[1120px]',
        className,
      )}
    >
      <header className="flex shrink-0 items-center gap-3">
        <h3 className="text-center text-[20px] font-bold leading-[24px] text-txt-tertiary">{teamName}</h3>
        {showMemberSummary && (
          <button
            type="button"
            onClick={onMoreClick}
            aria-label="전체 멤버 보기"
            className="inline-flex h-[40px] items-center rounded-[12px] border border-[var(--Border-Primary,#E2E8F0)] px-[10px] lg:hidden"
          >
            <div className="flex items-center">
              {visibleMemberImages.map((imageSrc, idx) => (
                <span
                  key={`${String(imageSrc)}-${idx}`}
                  className={cn('inline-flex', idx > 0 && '-ml-1')}
                >
                  <Profile
                    size="sm"
                    imageSrc={imageSrc}
                    decorative
                    className="md:hidden"
                    borderClassName="ring-1 ring-background-primary"
                  />
                  <Profile
                    size="md"
                    imageSrc={imageSrc}
                    decorative
                    className="hidden md:inline-flex"
                    borderClassName="ring-1 ring-background-primary"
                  />
                </span>
              ))}
            </div>
            {typeof memberCount === 'number' && (
              <span className="ml-2 text-lg font-medium leading-none text-txt-default">{memberCount}</span>
            )}
          </button>
        )}
      </header>

      <div className="mt-auto flex min-h-0 w-full min-w-0 flex-col">
        <TeamCardStatsSection
          progressPercent={progressPercent}
          todayTaskCount={todayTaskCount}
          completedTaskCount={completedTaskCount}
          statsClassName={statsClassName}
        />

        <TeamCardProgressRow
          teamName={teamName}
          progressPercent={progressPercent}
          trailing={
            <Dropdown>
              <Dropdown.Trigger
                aria-label="팀 메뉴"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-transparent p-0 text-icon-primary transition-colors hover:bg-background-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
              >
                <IconGear size={ICON_SIZE.md} />
              </Dropdown.Trigger>
              <TeamCardDropdownMenu
                className={
                  teamMenuMode === 'member'
                    ? TEAM_CARD_DROPDOWN_PANEL_CLASS_MEMBER
                    : TEAM_CARD_DROPDOWN_PANEL_CLASS
                }
              >
                {teamMenuMode === 'admin' ? (
                  <>
                    <Dropdown.Item
                      align="center"
                      type="button"
                      className={TEAM_CARD_MENU_ITEM_CLASS}
                      onClick={() => onEditTeam?.()}
                    >
                      수정하기
                    </Dropdown.Item>
                    <Dropdown.Item
                      align="center"
                      type="button"
                      className={TEAM_CARD_MENU_ITEM_CLASS}
                      onClick={() => onDeleteTeam?.()}
                    >
                      삭제하기
                    </Dropdown.Item>
                  </>
                ) : (
                  <Dropdown.Item
                    align="center"
                    type="button"
                    className={TEAM_CARD_MENU_ITEM_CLASS}
                    onClick={() => onLeaveTeam?.()}
                  >
                    팀 탈퇴하기
                  </Dropdown.Item>
                )}
              </TeamCardDropdownMenu>
            </Dropdown>
          }
        />
      </div>
      <MemberCardModal
        isOpen={isMemberModalOpen}
        open={openMemberModal}
        onClose={onModalClose}
        modalMode={memberModalMode}
        selectedMember={memberModalSelected}
        members={sortedMembers}
        onMemberClickInList={onMemberClickInList}
        onBackToList={memberDetailFromAllList ? onBackToList : undefined}
      />
    </article>
  );
}
