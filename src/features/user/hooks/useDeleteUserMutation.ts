import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../api/deleteUser';
import { ApiError } from '@/shared/types/apiError';
import { useRouter } from 'next/router';
import { useSignOut } from '@/features/auth/hooks/useSignOut';

export function useDeleteUserMutation() {
  const router = useRouter();
  const { mutate: signOut } = useSignOut();

  return useMutation<void, ApiError, void>({
    mutationFn: deleteUser,
    onSuccess: () => {
      signOut(undefined, {
        onSuccess: () => {
          router.replace('/');
        },
      });
    },
  });
}
