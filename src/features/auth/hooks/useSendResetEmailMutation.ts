import { useMutation } from '@tanstack/react-query';
import { DefaultResponse, SendResetPasswordEmailRequest } from '../model/dto/auth.dto';
import { ApiError } from '@/shared/types/apiError';
import { sendResetPasswordEmail } from '../api/sendResetPasswordEmail';

export function useSendResetEmailMutation() {
  return useMutation<DefaultResponse, ApiError, SendResetPasswordEmailRequest>({
    mutationFn: sendResetPasswordEmail,
  });
}
