import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SignUpRequest } from '../model/dto/auth.dto';
import { authService } from '../api/auth.service';
import { authKeys } from '@/shared/lib/queryKeys/authKeys';

export const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SignUpRequest) => authService.signUp(data),
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.me(), user);
    },
  });
};
