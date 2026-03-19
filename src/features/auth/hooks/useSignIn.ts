import { authKeys } from '@/shared/lib/queryKeys/authKeys';
import { User } from '@/shared/types/user.model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SignInRequest } from '../model/dto/auth.dto';
import { authService } from '../api/auth.service';

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, SignInRequest>({
    mutationFn: authService.signIn,
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.me(), user);
    },
  });
};
