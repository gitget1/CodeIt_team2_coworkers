import type { User } from '@/shared/types/user.model';
import type { Role } from '../types/role.type';

export interface MembershipGroup {
  id: number;
  teamId: string;
  name: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Membership {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userProfileImage?: string;
  role: Role;
  group: MembershipGroup;
}

// [GET] /{teamId}/user 최종 형태
export interface UserProfile extends User {
  memberships: Membership[];
}
