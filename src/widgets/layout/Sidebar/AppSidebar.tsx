import { memo, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Dropdown from '@/shared/ui/dropdown';
import { SidebarDropdownMenu, SidebarDropdownItem } from './SidebarDropdown';
import { useSignOut } from '@/features/auth/hooks/useSignOut';
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
import { useUserQuery } from '@/features/user/hooks/useUserQuery';
import { useSidebarTeamItems } from './useSidebarTeamItems';

const defaultProfileImgSrc = getImageSrc(userIcon);
const defaultProfileBgClass = 'rounded-xl bg-[#E2E8F0]';

const drawerToggleNoop = () => {};

type TeamSidebarRowProps = {
  id: string;
  label: string;
  isSelected: boolean;
  expanded: boolean;
  onSelect: (id: string) => void;
};

const TeamSidebarRow = memo(function TeamSidebarRow({
  id,
  label,
  isSelected,
  expanded,
  onSelect,
}: TeamSidebarRowProps) {
  const handleClick = useCallback(() => {
    onSelect(id);
  }, [id, onSelect]);

  return (
    <SidebarNavItem
      label={label}
      isSelected={isSelected}
      isExpanded={expanded}
      onClick={handleClick}
      icon={<TeamIcon className={isSelected ? 'text-brand-primary' : 'text-slate-300'} />}
    />
  );
});

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
  const { data: user } = useUserQuery();
  const { mutate: signOut } = useSignOut();

  if (!isLoggedIn) {
    const showProfileImage = isExpanded && !mobileDrawer;

    return (
      <SidebarFooter className="py-4">
        <button
          type="button"
          onClick={onLoginClick}
          className="flex w-full cursor-pointer items-center gap-3 rounded-lg text-left focus-visible:outline-none"
        >
          {showProfileImage && (
            <span
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center',
                defaultProfileBgClass,
              )}
              aria-hidden
            >
              <img src={defaultProfileImgSrc} alt="" className="h-full w-full object-contain" />
            </span>
          )}
          {mobileDrawer ? (
            <span className="text-txt-primary border-brand-primary min-w-0 flex-1 rounded-lg py-2 text-center text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none">
              로그인
            </span>
          ) : (
            <span
              className={cn(
                'text-txt-primary py-2 text-sm font-medium',
                !isExpanded && 'min-w-0 flex-1 text-center',
              )}
            >
              로그인
            </span>
          )}
        </button>
      </SidebarFooter>
    );
  }

  const profileImage = user?.profileImage;
  const displayName = user?.name?.trim() || '사용자';
  const displayEmail = user?.email ?? '';

  return (
    <SidebarFooter className="overflow-visible!">
      <Dropdown>
        <Dropdown.Trigger className="w-full text-left">
          {isExpanded ? (
            <MemberChip
              imageSrc={profileImage ?? defaultProfileImgSrc}
              name={displayName}
              email={displayEmail || undefined}
              size="lg"
              avatarClassName="bg-background-tertiary"
            />
          ) : (
            <Profile
              size="lg"
              imageSrc={profileImage ?? defaultProfileImgSrc}
              ariaLabel={`${displayName} 프로필`}
              className="bg-background-tertiary"
            />
          )}
        </Dropdown.Trigger>

        <SidebarDropdownMenu
          align="left"
          className="border-background-tertiary bottom-full z-[100] mb-2 w-21.5 min-w-0 overflow-hidden rounded-xl py-0"
        >
          <SidebarDropdownItem
            href="/mypage"
            className="min-h-10 justify-center rounded-none px-2 text-[13px]"
          >
            계정 설정
          </SidebarDropdownItem>
          <SidebarDropdownItem
            onClick={() => signOut()}
            className="min-h-10 justify-center rounded-none px-2 text-[13px]"
          >
            로그아웃
          </SidebarDropdownItem>
        </SidebarDropdownMenu>
      </Dropdown>
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

  const handleToggle = useCallback(() => {
    setIsExpanded((v) => !v);
  }, []);
  const handleTeamListToggle = useCallback(() => {
    setIsTeamListOpen((v) => !v);
  }, []);
  const handleTeamSelect = useCallback(
    (id: string) => {
      onTeamSelect?.(id);
    },
    [onTeamSelect],
  );

  const expanded = mobileDrawer ? true : isExpanded;

  return (
    <div className="border-background-tertiary bg-background-primary relative z-50 h-full shrink-0 overflow-visible border-r">
      <Sidebar
        isExpanded={expanded}
        onToggle={mobileDrawer ? drawerToggleNoop : handleToggle}
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
        className={cn('overflow-visible!', mobileDrawer ? 'h-full' : undefined)}
      >
        {mobileDrawer ? (
          <SidebarHeader
            isExpanded={true}
            onToggle={onClose ?? drawerToggleNoop}
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
                    sizes="180px"
                    className="h-8 w-auto shrink-0 object-contain object-left"
                    style={{ width: 'auto', height: '2rem' }}
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
              href="/boards"
              isExpanded={expanded}
              icon={<BoardIcon className="text-slate-300" />}
            />
            <SidebarNavItem
              label="팀 참여하기"
              href={ROUTES.ACCEPT_INVITATION}
              isExpanded={expanded}
              isSelected={router.pathname === '/accept-invitation'}
              icon={<TeamIcon className="text-slate-300" />}
            />
            {isLoggedIn && (
              <SidebarNavItem
                label="마이 히스토리"
                href="/myhistory"
                isExpanded={expanded}
                isSelected={router.pathname.startsWith('/myhistory')}
                icon={<BoardIcon className="text-slate-300" />}
              />
            )}

            {isLoggedIn && (
              <SidebarNavItem
                label="팀 추가하기"
                href={ROUTES.TEAM_CREATE}
                isExpanded={expanded}
                icon={<PlusIcon />}
                className={cn(
                  expanded &&
                    'border-brand-primary bg-background-primary text-brand-primary hover:bg-brand-secondary hover:text-brand-primary min-h-13 w-full justify-center gap-1 rounded-lg border px-3 py-2 text-center',
                )}
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
                      'text-txt-default flex min-h-13 w-full items-center gap-2 rounded-lg px-3 text-left text-base font-medium',
                      'hover:bg-background-tertiary hover:text-txt-primary transition-colors',
                      'focus-visible:ring-brand-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                    )}
                    {...(isTeamListOpen
                      ? { 'aria-expanded': true as const }
                      : { 'aria-expanded': false as const })}
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
                      <TeamSidebarRow
                        key={id}
                        id={id}
                        label={label}
                        isSelected={selectedTeamId === id}
                        expanded={expanded}
                        onSelect={handleTeamSelect}
                      />
                    ))}
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
          className="bg-background-primary text-txt-default hover:bg-background-tertiary hover:text-txt-primary focus-visible:ring-brand-primary border-background-tertiary absolute top-7 right-0 z-10 flex h-8 w-8 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label="사이드바 열기"
          {...{ 'aria-expanded': false as const }}
        >
          <FoldRightIcon className="h-6 w-6 text-slate-300" />
        </button>
      )}
    </div>
  );
}
