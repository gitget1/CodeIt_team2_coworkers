import { User } from '@/shared/types/user.model';
import { UserDTO } from '../../model/dto/auth.dto';

export const mapUserDTOToDomain = (dto: UserDTO): User => ({
  id: dto.id,
  email: dto.email,
  name: dto.nickname,
  profileImage: dto.image,
});
