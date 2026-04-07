import type { User } from '@/shared/types/user.model';
import type { Role } from '../types/role.type';
import { RecurrenceType } from '@/features/task/model/types/recurrence.type';

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

export interface UserTaskHistory {
  id: number;
  name: string;
  description: string;
  frequency: RecurrenceType;
  recurringId: number;
  displayIndex: number;
  userId: number;
  writerId: number;
  date: Date;
  doneAt: Date | null;
  updatedAt: Date;
  deletedAt: Date | null;
}
