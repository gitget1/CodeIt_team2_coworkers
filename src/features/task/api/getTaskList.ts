import httpClient from '@/shared/api/httpClient';
import { toTaskList } from '../lib/mappers/task.mapper';
import type { TaskList } from '../model/entities/task.model';
import type { TaskListDto } from '../model/dto/task.dto';
import { mockTaskList } from './mockTask';
import type { GetTaskListQueryDto } from '../model/dto/task.request.dto';
import type { TaskCommonParams } from '../model/params/task.params';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

// TODO: 클라이언트에서는 Date를 받고, API 호출 시 변환하도록 정리 필요
// 날짜만 필요한곳, 시간까지 필요한곳이 필요로 하는곳이 다름

// TODO: API 에러 핸들링 필요
// 임시 MOCK 데이터 사용 - 토큰 발급, API 명세 확정 후 제거 예정
export async function getTaskList(
  path: TaskCommonParams,
  query?: GetTaskListQueryDto,
): Promise<TaskList> {
  if (USE_MOCK) {
    return toTaskList(mockTaskList);
  }

  const { teamId, groupId, taskListId } = path;
  const { data } = await httpClient.get<TaskListDto>(
    `/${teamId}/groups/${groupId}/task-lists/${taskListId}`,
    {
      params: {
        query,
      },
    },
  );

  return toTaskList(data);
}
