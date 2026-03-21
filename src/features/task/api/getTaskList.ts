import { toTaskList } from '../lib/mappers/task.mapper';
import type { TaskList } from '../model/entities/task.model';
import type { TaskListDto } from '../model/dto/task.dto';
import type { GetTaskListQuery } from '../model/dto/task.query';
import type { TaskCommonParams } from '../model/params/task.params';
import { clientFetcher } from '@/shared/lib/axios/client-fetcher';

// TODO: API 에러 핸들링 필요
export async function getTaskList(
  path: TaskCommonParams,
  query?: GetTaskListQuery,
): Promise<TaskList> {
  const { groupId, taskListId } = path;

  const { data } = await clientFetcher.get<TaskListDto>(
    `/groups/${groupId}/task-lists/${taskListId}`,
    {
      params: query,
    },
  );

  return toTaskList(data);
}
