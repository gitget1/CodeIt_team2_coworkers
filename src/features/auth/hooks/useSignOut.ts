import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../api/auth.service';
import { USER_QUERY_KEYS } from '@/features/user';

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.signOut,
    onSuccess: async () => {
      await queryClient.cancelQueries();
      queryClient.clear();
      queryClient.setQueryData(USER_QUERY_KEYS.me(), null);
    },
  });
};
