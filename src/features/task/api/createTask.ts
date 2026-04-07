import { mapTaskErrorToFailure } from './mapTaskErrorToFailure';
import type { Result } from '@/shared/types/result';
import type { TaskDto } from '../model/dto/task.dto';
import type { Task } from '../model/entities/task.model';
import { toTask } from '../lib/mappers/task.mapper';
import type { CreateTaskParams } from '../model/params/task.create.params';
import type { TaskCommonParams } from '../model/params/task.params';
import { clientFetcher } from '@/shared/lib/axios/client-fetcher';

export async function createTask(
  path: TaskCommonParams,
  body: CreateTaskParams,
): Promise<Result<Task>> {
  const { groupId, taskListId } = path;
  try {
    const res = await clientFetcher.post<TaskDto>(
      `/groups/${groupId}/task-lists/${taskListId}/tasks`,
      {
        ...body,
        startDate: body.startDate?.toISOString(),
      },
    );

    return { ok: true, data: toTask(res.data, taskListId) };
  } catch (error: unknown) {
    return mapTaskErrorToFailure(error);
  }
}

// TODO:
// 추후 React Query 전역 onError와 UI를 연결하여
// UI 레이어에서 에러 메시지를 표시하도록 처리 예정
