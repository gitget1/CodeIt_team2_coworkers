import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '../api/updatePassword';
import { toast } from 'sonner';
import { ApiError } from '@/shared/types/apiError';
import { UpdatePasswordRequest } from '../model/dto/user.dto';

export function useUpdatePasswordMutation() {
  return useMutation<{ message: string }, ApiError, UpdatePasswordRequest>({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      toast.success('비밀번호가 성공적으로 변경되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message || '비밀번호 변경에 실패했습니다.');
    },
  });
}
