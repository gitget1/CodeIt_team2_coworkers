import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../api/updateUser';
import { USER_QUERY_KEYS } from '../lib/queryKeys';
import { authKeys } from '@/shared/lib/queryKeys/authKeys';
import { ApiError } from '@/shared/types/apiError';
import { PatchUserRequest } from '../model/dto/user.dto';
import { User } from '@/shared/types/user.model';

type UpdateUserContext = {
  previousUser: User | undefined;
};

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, ApiError, PatchUserRequest, UpdateUserContext>({
    mutationFn: updateUser,

    // 낙관적 업데이트
    onMutate: async (newUserData) => {
      await queryClient.cancelQueries({ queryKey: authKeys.me() });

      const previousUser = queryClient.getQueryData<User>(authKeys.me());

      // 화면 즉시 변경
      if (previousUser) {
        queryClient.setQueryData<User>(authKeys.me(), {
          ...previousUser,
          ...newUserData,
        });
      }

      return { previousUser };
    },

    onError: (err, newUserData, context) => {
      // 백업해둔 걸로 화면 원상복구
      if (context?.previousUser) {
        queryClient.setQueryData<User>(authKeys.me(), context.previousUser);
      }
    },

    // 성공/실패 상관없이 마지막엔 서버랑 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
}
