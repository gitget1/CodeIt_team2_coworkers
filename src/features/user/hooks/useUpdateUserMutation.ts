import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GROUP_QUERY_KEYS } from '@/features/group/lib/queryKeys';
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
          profileImage: newUserData.image ?? previousUser.profileImage,
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
      // 팀 멤버 목록·멤버카드는 group 상세 캐시의 userImage/userName을 쓰므로 프로필 변경 시 같이 갱신
      void queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEYS.all });
    },
  });
}
