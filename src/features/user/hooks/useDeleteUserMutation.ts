import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../api/deleteUser';
import { ApiError } from '@/shared/types/apiError';
import { authKeys } from '@/shared/lib/queryKeys/authKeys';
import { useRouter } from 'next/router';

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, ApiError, void>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData(authKeys.me(), null);

      router.push('/');
    },
  });
}
