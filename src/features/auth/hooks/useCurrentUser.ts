import { authKeys } from '@/shared/lib/queryKeys/authKeys';
import { User } from '@/shared/types/user.model';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { authService } from '../api/auth.service';

export const useCurrentUser = () => {
  return useQuery<User | null>({
    queryKey: authKeys.me(),
    queryFn: async () => {
      try {
        return await authService.getUserMe();
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
