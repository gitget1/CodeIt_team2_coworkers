import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SignUpRequest } from '../model/dto/auth.dto';
import { authService } from '../api/auth.service';
import { authKeys } from '@/shared/lib/queryKeys/authKeys';
import { User } from '@/shared/types/user.model';

export const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation<User, Error, SignUpRequest>({
    mutationFn: (data: SignUpRequest) => authService.signUp(data),
    meta: {
      disableGlobalError: true,
    },
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.me(), user);
    },
  });
};
