import axios from 'axios';
import { SignInRequest, SignUpRequest, SignUpResponse, UserDTO } from '../model/dto/auth.dto';
import { User } from '@/shared/types/user.model';
import { mapUserDTOToDomain } from '../lib/mappers/auth.mapper';
import { clientFetcher } from '@/shared/lib/axios/client-fetcher';

const requestBffAuth = async (
  endpoint: 'signIn' | 'signUp',
  payload: SignInRequest | SignUpRequest,
): Promise<User> => {
  const { data } = await axios.post<{ user: UserDTO }>(`/api/auth/${endpoint}`, payload);
  return mapUserDTOToDomain(data.user);
};

export const authService = {
  signIn: (payload: SignInRequest) => requestBffAuth('signIn', payload),

  signUp: (payload: SignUpRequest) => requestBffAuth('signUp', payload),

  signOut: async (): Promise<void> => {
    await axios.post('/api/auth/signOut');
  },

  getUserMe: async (): Promise<User> => {
    const { data } = await clientFetcher.get<UserDTO>('/user', {
      skipAuthFailureRedirect: true,
    });
    return mapUserDTOToDomain(data);
  },
};
