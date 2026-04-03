import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../api/updateUser';
import { USER_QUERY_KEYS } from '../lib/queryKeys';
import { ApiError } from '@/shared/types/apiError';
import { PatchUserRequest } from '../model/dto/user.dto';
import { UserProfile } from '../model/entities/user.model';

type UpdateUserContext = {
  previousUser: UserProfile | null | undefined;
};

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, ApiError, PatchUserRequest, UpdateUserContext>({
    mutationFn: updateUser,

    // 낙관적 업데이트
    onMutate: async (newUserData) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEYS.me() });

      const previousUser = queryClient.getQueryData<UserProfile | null>(USER_QUERY_KEYS.me());

      // 화면 즉시 변경
      if (previousUser) {
        queryClient.setQueryData<UserProfile>(USER_QUERY_KEYS.me(), {
          ...previousUser,
          name: newUserData.nickname ?? previousUser.name,
        });
      }

      return { previousUser };
    },

    onError: (err, newUserData, context) => {
      // 백업해둔 걸로 화면 원상복구
      if (context?.previousUser) {
        queryClient.setQueryData<UserProfile>(USER_QUERY_KEYS.me(), context.previousUser);
      }
    },

    // 성공/실패 상관없이 마지막엔 서버랑 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.me() });
    },
  });
}
