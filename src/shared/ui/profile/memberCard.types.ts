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
  onInvite?: () => void;
};

