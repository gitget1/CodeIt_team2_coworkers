import axios from 'axios';
import { SignInRequest, SignUpRequest, SignUpResponse, UserDTO } from '../model/dto/auth.dto';
import { User } from '@/shared/types/user.model';
import { mapUserDTOToDomain } from '../lib/mappers/auth.mapper';
import { clientFetcher } from '@/shared/lib/axios/client-fetcher';

export const authService = {
  signIn: async (payload: SignInRequest): Promise<User> => {
    const { data } = await axios.post<{ user: UserDTO }>('/api/auth/signIn', payload);

    return mapUserDTOToDomain(data.user);
  },

  signOut: async (): Promise<void> => {
    await axios.post('/api/auth/signOut');
  },

  signUp: async (payload: SignUpRequest): Promise<User> => {
    const { data } = await axios.post<{ user: UserDTO }>('/api/auth/signUp', payload);
    return mapUserDTOToDomain(data.user);
  },

  getUserMe: async (): Promise<User> => {
    const { data } = await clientFetcher.get<UserDTO>('/user', {
      skipAuthFailureRedirect: true,
    });
    return mapUserDTOToDomain(data);
  },
};
