import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { PostGroupRequest } from '../model/dto/group.dto';
import { createGroup } from '../api/createGroup';
import { ApiError } from '@/shared/types/apiError';
import { Group } from '../model/entities/group.model';
import { USER_QUERY_KEYS } from '@/features/user/lib/queryKeys';
import { GROUP_QUERY_KEYS } from '../lib/queryKeys';

export function useCreateGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation<Group, ApiError, { body: PostGroupRequest }>({
    mutationFn: createGroup,
    onSuccess: (newGroup) => {
      // 전체 그룹 목록 새로고침 사이드바 업데이트용
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.groups() });
      queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEYS.all });
    },
  });
}
