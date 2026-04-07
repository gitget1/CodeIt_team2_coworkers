import type { RecurrenceType } from '@/features/task/model/types/recurrence.type';
import type { Role } from '../types/role.type';

export interface UserDto {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MembershipGroupDto {
  id: number;
  teamId: string;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MembershipDto {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: Role;
  group: MembershipGroupDto;
}

// API 요청/응답 DTO

// [GET] /{teamId}/user
export interface GetUserResponse extends UserDto {
  memberships: MembershipDto[];
}

// [PATCH] /{teamId}/user
export interface PatchUserRequest {
  nickname?: string;
  image?: string;
}

// [PATCH] /{teamId}/user/password
export interface UpdatePasswordRequest {
  passwordConfirmation: string;
  password: string;
}

// [GET] /{teamId}/user/history
export interface UserTaskHistoryDto {
  id: number;
  name: string;
  description: string | null;
  date: string;
  doneAt: string | null;
  updatedAt: string;
  deletedAt: string | null;
  frequency: RecurrenceType;
  recurringId: number;
  displayIndex: number;
  userId: number;
  writerId: number;
}

export interface GetUserHistoryResponse {
  tasksDone: UserTaskHistoryDto[];
}
