import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { DefaultResponse, SendResetPasswordEmailRequest } from '../model/dto/auth.dto';

export async function sendResetPasswordEmail(
  params: SendResetPasswordEmailRequest,
): Promise<DefaultResponse> {
  const { data } = await clientFetcher.post<DefaultResponse>(
    '/user/send-reset-password-email',
    params,
  );
  return data;
}
