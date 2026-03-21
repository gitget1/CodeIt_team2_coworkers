import type { User } from '@/shared/types/user.model';
import type { Membership, MembershipGroup, UserProfile } from '../../model/entities/user.model';

import type {
  UserDto,
  MembershipDto,
  MembershipGroupDto,
  GetUserResponse,
} from '../../model/dto/user.dto';

// 기본 유저 매퍼
export const toUser = (dto: UserDto): User => ({
  id: dto.id,
  email: dto.email,
  name: dto.nickname ?? '익명의 사용자',
  profileImage: dto.image ?? undefined,
  teamId: dto.teamId,
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt),
});

// 그룹
export const toMembershipGroup = (dto: MembershipGroupDto): MembershipGroup => ({
  id: dto.id,
  teamId: dto.teamId,
  name: dto.name,
  imageUrl: dto.image ?? undefined,
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt),
});

// 멤버
export const toMembership = (dto: MembershipDto): Membership => ({
  userId: dto.userId,
  groupId: dto.groupId,
  userName: dto.userName ?? '이름 없음',
  userEmail: dto.userEmail,
  userProfileImage: dto.userImage ?? undefined,
  role: dto.role,
  group: toMembershipGroup(dto.group),
});

// 최종 프로필
export const toUserProfile = (dto: GetUserResponse): UserProfile => ({
  ...toUser(dto),
  memberships: dto.memberships.map(toMembership),
});
