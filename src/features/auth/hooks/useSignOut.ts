import { authKeys } from '@/shared/lib/queryKeys/authKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../api/auth.service';

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.signOut,
    onSuccess: async () => {
      await queryClient.cancelQueries();
      queryClient.clear();
      queryClient.setQueryData(authKeys.me(), null);
    },
  });
};
