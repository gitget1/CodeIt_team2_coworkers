import { useMutation } from '@tanstack/react-query';
import {
  acceptGroupInvitation,
  type AcceptGroupInvitationParams,
} from '../api/acceptGroupInvitation';
import type { ApiError } from '@/shared/types/apiError';
import type { AcceptInvitationResponse } from '../model/dto/group.dto';

export function useAcceptInvitationMutation() {
  return useMutation<AcceptInvitationResponse, ApiError, AcceptGroupInvitationParams>({
    mutationFn: acceptGroupInvitation,
  });
}

