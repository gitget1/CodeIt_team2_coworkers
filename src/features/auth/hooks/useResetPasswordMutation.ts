import { useMutation } from '@tanstack/react-query';
import { DefaultResponse, ResetPasswordRequest } from '../model/dto/auth.dto';
import { ApiError } from '@/shared/types/apiError';
import { resetPassword } from '../api/resetPassword';

export function useResetPasswordMutation() {
  return useMutation<DefaultResponse, ApiError, ResetPasswordRequest>({
    mutationFn: resetPassword,
  });
}
