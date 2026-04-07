import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import { GetUserHistoryResponse } from '../model/dto/user.dto';

export const getUserHistory = async (): Promise<GetUserHistoryResponse> => {
  const { data } = await clientFetcher.get<GetUserHistoryResponse>(`/user/history`);
  return data;
};
