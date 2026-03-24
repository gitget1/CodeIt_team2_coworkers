import type { MemberCardItem } from './memberCard.types';

export type MemberCompactStackProps = {
  members: MemberCardItem[];
  maxVisibleAvatars?: number;
  className?: string;
  interactive?: boolean;
  onOpen?: () => void;
};

