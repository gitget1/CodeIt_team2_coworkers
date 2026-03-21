export interface User {
  id: number;
  email: string;
  name: string;
  profileImage: string | undefined;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
}
