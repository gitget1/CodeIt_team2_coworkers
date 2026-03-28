import type { TaskListDto } from '@/features/task/model/dto/task.dto';
import type { Role } from '@/features/user';
export interface GroupDto {
  id: number;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GroupMemberDto {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: Role;
}

// API 요청/응답

// [GET] /{teamId}/groups/{id}
export interface GetGroupDetailResponse extends GroupDto {
  members: GroupMemberDto[];
  taskLists: TaskListDto[];
}

// [POST] /{teamId}/groups 그룹 생성
export interface PostGroupRequest {
  name: string;
  image?: string | null;
}
// [POST] /{teamId}/groups
export interface PostGroupResponse extends GroupDto {}

// [PATCH] /{teamId}/groups/{id} 그룹 수정
export interface PatchGroupRequest {
  name?: string;
  image?: string | null;
}

// [POST] /{teamId}/groups/{id}/member
export interface AddMemberRequest {
  userEmail: string;
}
