import { useState } from 'react';
import Image from 'next/image';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNavItem,
} from '@/shared/ui/Sidebar';
import { cn } from '@/shared/lib/cn';
import { TeamIcon, BoardIcon, PlusIcon, ArrowDownIcon, FoldLeftIcon, FoldRightIcon, LogoIcon, CloseIcon } from './sidebar-icons';
import { ROUTES } from '@/shared/constants/routes';
import { DEFAULT_TEAM_ITEMS } from './constants';
import type { AppSidebarProps } from './types';
import { getImageSrc } from '@/shared/lib/getImageSrc';
import logoLg from '@/shared/assets/images/logo-lg.png';
import userIcon from '@/shared/assets/icons/user.svg';
import { MemberChip, Profile } from '@/shared/ui/profile';

const defaultProfileImgSrc = getImageSrc(userIcon);
const defaultProfileBgClass = 'rounded-xl bg-[#E2E8F0]';

function DefaultFooter({
  isExpanded,
  isLoggedIn,
  mobileDrawer = false,
  onLoginClick,
}: {
  isExpanded: boolean;
  isLoggedIn: boolean;
  mobileDrawer?: boolean;
  onLoginClick?: () => void;
}) {
  if (!isLoggedIn) {
    const showProfileImage = isExpanded && !mobileDrawer;

    return (
      <SidebarFooter className="py-4">
        <div className="flex items-center gap-3">
          {showProfileImage && (
            <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden', defaultProfileBgClass)} aria-hidden>
              <img src={defaultProfileImgSrc} alt="" className="h-full w-full object-contain" />
            </span>
          )}
          {mobileDrawer ? (
            <button
              type="button"
              onClick={onLoginClick}
              className="flex-1 min-w-0 rounded-lg py-2 text-center text-sm font-medium text-txt-primary transition-colors hover:bg-background-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            >
              로그인
            </button>
          ) : (
            <span
              className={cn(
                'text-sm font-medium text-txt-primary',
                !isExpanded && 'flex-1 min-w-0 text-center',
              )}
            >
              로그인
            </span>
          )}
        </div>
      </SidebarFooter>
    );
  }

  // TODO: 인증/프로필 API 연동 후 하드코딩 제거 — 실제 사용자 이름·팀명·프로필 이미지·ariaLabel을 props 또는 전역 상태로 주입
  return (
    <SidebarFooter>
      {isExpanded ? (
        <MemberChip
          imageSrc={defaultProfileImgSrc}
          name="안해나"
          teamName="경영관리팀"
          size="lg"
          avatarClassName="bg-background-tertiary"
        />
      ) : (
        <Profile size="lg" imageSrc={defaultProfileImgSrc} ariaLabel="프로필" className="bg-background-tertiary" />
      )}
    </SidebarFooter>
  );
}

export function AppSidebar({
  selectedTeamId = null,
  onTeamSelect,
  onAddTeam,
  footer,
  teams,
  isLoggedIn = false,
  mobileDrawer = false,
  onClose,
  onLoginClick,
}: AppSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTeamListOpen, setIsTeamListOpen] = useState(true);
  const handleToggle = () => setIsExpanded((v) => !v);
  const handleTeamListToggle = () => setIsTeamListOpen((v) => !v);

  const teamItems = teams ?? [...DEFAULT_TEAM_ITEMS];
  const expanded = mobileDrawer ? true : isExpanded;

  return (
    <div className={cn('relative shrink-0 overflow-visible', mobileDrawer && 'h-full')}>
      <Sidebar
        isExpanded={expanded}
        onToggle={mobileDrawer ? () => {} : handleToggle}
        footer={footer ?? <DefaultFooter isExpanded={expanded} isLoggedIn={isLoggedIn} mobileDrawer={mobileDrawer} onLoginClick={onLoginClick} />}
        className={mobileDrawer ? 'h-full' : undefined}
      >
        {mobileDrawer ? (
          <SidebarHeader
            isExpanded={true}
            onToggle={onClose ?? (() => {})}
            showToggle={true}
            toggleButton={<CloseIcon className="text-slate-300" />}
            logo={<span className="flex-1" />}
          />
        ) : (
          <SidebarHeader
            isExpanded={isExpanded}
            onToggle={handleToggle}
            showToggle={isExpanded}
            toggleButton={isExpanded ? <FoldLeftIcon className="text-slate-300" /> : undefined}
            logo={
              isExpanded ? (
                <Image
                  src={logoLg}
                  alt="COWORKERS"
                  width={180}
                  height={32}
                  className="h-8 w-auto shrink-0 object-contain object-left"
                />
              ) : (
                <span className="flex items-center justify-center text-brand-primary">
                  <LogoIcon />
                </span>
              )
            }
          />
        )}
        <SidebarContent>
        <nav className="flex flex-col gap-2 px-2">
          <SidebarNavItem
            label="자유게시판"
            href={ROUTES.FREE_BOARD}
            isExpanded={expanded}
            icon={<BoardIcon className="text-slate-300" />}
          />
          {isLoggedIn && (
            <>
              <div className="my-2 border-t border-[var(--color-background-tertiary)]" role="separator" />
              {expanded ? (
                <button
                  type="button"
                  onClick={handleTeamListToggle}
                  className={cn(
                    'flex items-center gap-2 w-full min-h-[52px] px-3 rounded-lg text-left text-base font-medium text-txt-default',
                    'hover:bg-background-tertiary hover:text-txt-primary transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
                  )}
                  aria-expanded={isTeamListOpen}
                  aria-label={isTeamListOpen ? '팀 목록 접기' : '팀 목록 펼치기'}
                >
                  <span className="shrink-0 flex items-center justify-center w-5 h-5 [&>svg]:w-5 [&>svg]:h-5 text-slate-300">
                    <TeamIcon className="text-slate-300" />
                  </span>
                  <span className="truncate flex-1">팀 선택</span>
                  <span
                    className={cn(
                      'shrink-0 transition-transform duration-200',
                      !isTeamListOpen && 'rotate-180',
                    )}
                  >
                    <ArrowDownIcon />
                  </span>
                </button>
              ) : null}
              {(isTeamListOpen || !expanded) && (
                <>
                  {teamItems.map(({ id, label }) => (
                    <SidebarNavItem
                      key={id}
                      label={label}
                      isSelected={selectedTeamId === id}
                      isExpanded={expanded}
                      onClick={() => onTeamSelect?.(id)}
                      icon={<TeamIcon className="text-slate-300" />}
                    />
                  ))}
                  <SidebarNavItem
                    label="팀 추가하기"
                    isExpanded={expanded}
                    onClick={() => onAddTeam?.()}
                    icon={<PlusIcon />}
                    className={cn(
                      expanded &&
                        'min-h-[52px] w-full justify-center gap-1 rounded-lg border border-brand-primary bg-background-primary py-2 px-3 text-center text-brand-primary hover:bg-brand-secondary hover:text-brand-primary',
                    )}
                  />
                </>
              )}
            </>
          )}
        </nav>
      </SidebarContent>
    </Sidebar>
      {!mobileDrawer && !expanded && (
        <button
          type="button"
          onClick={handleToggle}
          className="absolute right-0 top-7 z-10 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-[var(--color-background-tertiary)] bg-background-primary text-txt-default shadow-sm hover:bg-background-tertiary hover:text-txt-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          aria-label="사이드바 열기"
          aria-expanded={false}
        >
          <FoldRightIcon className="h-6 w-6 text-slate-300" />
        </button>
      )}
    </div>
  );
}
