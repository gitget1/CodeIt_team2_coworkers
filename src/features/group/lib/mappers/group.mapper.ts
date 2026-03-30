import type { Group, GroupDetail, GroupMember } from '../../model/entities/group.model';
import type { GroupDto, GetGroupDetailResponse, GroupMemberDto } from '../../model/dto/group.dto';
import { toTaskList } from '@/features/task/lib/mappers/task.mapper';

export function toGroup(dto: GroupDto): Group {
  return {
    id: dto.id,
    name: dto.name,
    image: dto.image,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  };
}

export function toGroupMember(dto: GroupMemberDto): GroupMember {
  return {
    userId: dto.userId,
    groupId: dto.groupId,
    userName: dto.userName,
    userEmail: dto.userEmail,
    userImage: dto.userImage,
    role: dto.role,
  };
}

export function toGroupDetail(dto: GetGroupDetailResponse): GroupDetail {
  return {
    ...toGroup(dto),
    members: dto.members.map(toGroupMember),
    taskLists: dto.taskLists.map(toTaskList),
  };
}
