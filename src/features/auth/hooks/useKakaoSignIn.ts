import { User } from '@/shared/types/user.model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../api/auth.service';
import { authKeys } from '@/shared/lib/queryKeys/authKeys';

export const useKakaoSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, { redirectUri: string; token: string }>({
    mutationFn: authService.kakaoSignIn,
    onSuccess: async (user) => {
      queryClient.setQueryData(authKeys.me(), user);
      await queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};
