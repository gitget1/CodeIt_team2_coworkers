import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '../api/updatePassword';
import { ApiError } from '@/shared/types/apiError';
import { UpdatePasswordRequest } from '../model/dto/user.dto';

export function useUpdatePasswordMutation() {
  return useMutation<{ message: string }, ApiError, UpdatePasswordRequest>({
    mutationFn: updatePassword,
  });
}
