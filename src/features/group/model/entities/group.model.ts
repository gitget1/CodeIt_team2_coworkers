import type { Role } from '@/features/user';
import type { TaskList } from '@/features/task/model/entities/task.model';

export interface Group {
  id: number;
  name: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GroupMember {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: Role;
}

export interface GroupDetail extends Group {
  members: GroupMember[];
  taskLists: TaskList[];
}
