import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { toast } from 'sonner';
import {
  acceptGroupInvitation,
  type AcceptGroupInvitationParams,
} from '../api/acceptGroupInvitation';
import type { ApiError } from '@/shared/types/apiError';
import type { AcceptInvitationResponse } from '../model/dto/group.dto';
import { isApiError } from '@/shared/api/mapApiError';
import { USER_QUERY_KEYS } from '@/features/user/lib/queryKeys';

/**
 * 토스트·invalidate 이후 페이지 측 후속 처리(라우팅 등).
 * `onSuccess`에 API 응답을 넘겨 `groupId`로 이동할 수 있게 합니다.
 */
export type UseAcceptInvitationMutationParams = {
  onSuccess: (data: AcceptInvitationResponse) => void | Promise<void>;
  onError: () => void;
};

export function useAcceptInvitationMutation(params: UseAcceptInvitationMutationParams) {
  const queryClient = useQueryClient();
  const paramsRef = useRef(params);
  paramsRef.current = params;

  return useMutation<AcceptInvitationResponse, ApiError, AcceptGroupInvitationParams>({
    mutationFn: acceptGroupInvitation,
    onSuccess: async (data) => {
      toast.success('팀에 참여했습니다.');
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.groups() });
      await paramsRef.current.onSuccess(data);
    },
    onError: (error) => {
      toast.error(isApiError(error) ? error.message : '팀 참여에 실패했습니다.');
      paramsRef.current.onError();
    },
  });
}
