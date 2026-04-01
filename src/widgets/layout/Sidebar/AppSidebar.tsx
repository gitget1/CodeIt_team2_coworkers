import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGetUserHistory } from '@/features/user/hooks/useGetUserHistory';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNavItem,
} from '@/shared/ui/Sidebar';
import { cn } from '@/shared/lib/cn';
import {
  TeamIcon,
  BoardIcon,
  PlusIcon,
  ArrowDownIcon,
  FoldLeftIcon,
  FoldRightIcon,
  LogoIcon,
  CloseIcon,
} from './sidebar-icons';
import { ROUTES } from '@/shared/constants/routes';
import type { AppSidebarProps } from './types';
import { getImageSrc } from '@/shared/lib/getImageSrc';
import logoLg from '@/shared/assets/images/logo-lg.png';
import userIcon from '@/shared/assets/icons/user.svg';
import { MemberChip, Profile } from '@/shared/ui/profile';
import { useSidebarTeamItems } from './useSidebarTeamItems';

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
            <span
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden',
                defaultProfileBgClass,
              )}
              aria-hidden
            >
              <img src={defaultProfileImgSrc} alt="" className="h-full w-full object-contain" />
            </span>
          )}
          {mobileDrawer ? (
            <button
              type="button"
              onClick={onLoginClick}
              className="text-txt-primary hover:bg-background-tertiary focus-visible:ring-brand-primary min-w-0 flex-1 rounded-lg py-2 text-center text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              로그인
            </button>
          ) : (
            <span
              className={cn(
                'text-txt-primary text-sm font-medium',
                !isExpanded && 'min-w-0 flex-1 text-center',
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
        <Profile
          size="lg"
          imageSrc={defaultProfileImgSrc}
          ariaLabel="프로필"
          className="bg-background-tertiary"
        />
      )}
    </SidebarFooter>
  );
}

export function AppSidebar({
  selectedTeamId = null,
  onTeamSelect,
  footer,
  teams,
  isLoggedIn = false,
  mobileDrawer = false,
  onClose,
  onLoginClick,
}: AppSidebarProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTeamListOpen, setIsTeamListOpen] = useState(true);
  const teamItems = useSidebarTeamItems({ teams, isLoggedIn });

  const { data: historyList } = useGetUserHistory();
  const hasHistory = historyList && historyList.length > 0;

  const handleToggle = () => setIsExpanded((v) => !v);
  const handleTeamListToggle = () => setIsTeamListOpen((v) => !v);
  const expanded = mobileDrawer ? true : isExpanded;

  return (
    <div className="relative h-full shrink-0 overflow-visible">
      <Sidebar
        isExpanded={expanded}
        onToggle={mobileDrawer ? () => {} : handleToggle}
        footer={
          footer ?? (
            <DefaultFooter
              isExpanded={expanded}
              isLoggedIn={isLoggedIn}
              mobileDrawer={mobileDrawer}
              onLoginClick={onLoginClick}
            />
          )
        }
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
              <Link href={ROUTES.FREE_BOARD} aria-label="홈으로 이동">
                {isExpanded ? (
                  <Image
                    src={logoLg}
                    alt="COWORKERS"
                    width={180}
                    height={32}
                    className="h-8 w-auto shrink-0 object-contain object-left"
                  />
                ) : (
                  <span className="text-brand-primary flex items-center justify-center">
                    <LogoIcon />
                  </span>
                )}
              </Link>
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
            {isLoggedIn && hasHistory && (
              <SidebarNavItem
                label="마이 히스토리"
                href="/myhistory"
                isExpanded={expanded}
                isSelected={router.pathname.startsWith('/myhistory')}
                icon={<BoardIcon className="text-slate-300" />}
              />
            )}

            {isLoggedIn && (
              <>
                <div className="border-background-tertiary my-2 border-t" role="separator" />
                {expanded ? (
                  <button
                    type="button"
                    onClick={handleTeamListToggle}
                    className={cn(
                      'text-txt-default flex min-h-[52px] w-full items-center gap-2 rounded-lg px-3 text-left text-base font-medium',
                      'hover:bg-background-tertiary hover:text-txt-primary transition-colors',
                      'focus-visible:ring-brand-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                    )}
                    aria-expanded={isTeamListOpen}
                    aria-label={isTeamListOpen ? '팀 목록 접기' : '팀 목록 펼치기'}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center text-slate-300 [&>svg]:h-5 [&>svg]:w-5">
                      <TeamIcon className="text-slate-300" />
                    </span>
                    <span className="flex-1 truncate">팀 선택</span>
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
                      href={ROUTES.TEAM_CREATE}
                      isExpanded={expanded}
                      icon={<PlusIcon />}
                      className={cn(
                        expanded &&
                          'border-brand-primary bg-background-primary text-brand-primary hover:bg-brand-secondary hover:text-brand-primary min-h-[52px] w-full justify-center gap-1 rounded-lg border px-3 py-2 text-center',
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
          className="bg-background-primary text-txt-default hover:bg-background-tertiary hover:text-txt-primary focus-visible:ring-brand-primary absolute top-7 right-0 z-10 flex h-8 w-8 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-background-tertiary)] shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label="사이드바 열기"
          aria-expanded={false}
        >
          <FoldRightIcon className="h-6 w-6 text-slate-300" />
        </button>
      )}
    </div>
  );
}
