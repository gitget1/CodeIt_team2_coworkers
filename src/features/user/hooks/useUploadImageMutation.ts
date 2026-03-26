import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '../api/uploadImage';
import { ApiError } from '@/shared/types/apiError';

export function useUploadImageMutation() {
  return useMutation<{ url: string }, ApiError, File>({
    mutationFn: uploadImage,
  });
}
