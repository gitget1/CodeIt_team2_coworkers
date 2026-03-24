import type { ImageAsset } from './Profile.types';

export type MemberCardItem = {
  id: string;
  name: string;
  email?: string;
  imageSrc?: ImageAsset;
  isAdmin?: boolean;
};

export type MemberCardModalMode = 'member' | 'all';

export type MemberCardProps = {
  members: MemberCardItem[];
  title?: string;
  className?: string;
  maxVisibleCount?: number;
  /** 기본값: 모바일/태블릿에서만 멤버 행 클릭 가능 */
  isMemberRowInteractive?: boolean;
  onInvite?: () => void;
};

