import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { DefaultResponse, ResetPasswordRequest } from '../model/dto/auth.dto';

export async function resetPassword(params: ResetPasswordRequest): Promise<DefaultResponse> {
  const { data } = await clientFetcher.patch<DefaultResponse>('/user/reset-password', params);
  return data;
}
