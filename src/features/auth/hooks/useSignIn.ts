import { User } from '@/shared/types/user.model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SignInRequest } from '../model/dto/auth.dto';
import { authService } from '../api/auth.service';
import { USER_QUERY_KEYS } from '@/features/user';

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, SignInRequest>({
    mutationFn: authService.signIn,
    meta: {
      disableGlobalError: true,
    },
    onSuccess: (user) => {
      queryClient.setQueryData(USER_QUERY_KEYS.me(), user);
    },
  });
};
