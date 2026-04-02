import { useQuery } from '@tanstack/react-query';
import { getUserHistory } from '../api/getUserHistory';
import { GetUserHistoryResponse } from '../model/dto/user.dto';
import { ApiError } from '@/shared/types/apiError';
import { USER_QUERY_KEYS } from '../lib/queryKeys';
import { toUserTaskHistory } from '../lib/mappers/user.mapper';
import { UserTaskHistory } from '../model/entities/user.model';
import { useUserQuery } from './useUserQuery';

export const useGetUserHistory = () => {
  const { data: user } = useUserQuery();

  return useQuery<GetUserHistoryResponse, ApiError, UserTaskHistory[]>({
    queryKey: USER_QUERY_KEYS.history(),
    queryFn: getUserHistory,
    select: (data) => data.tasksDone.map(toUserTaskHistory),
    enabled: !!user,
  });
};
