import httpClient from '@/shared/api/httpClient';
import { mapTaskError } from './mapTaskError';
import type { Result } from '@/shared/types/result';
import type { TaskDto } from '../model/dto/task.dto';
import type { Task } from '../model/entities/task.model';
import { toTask } from '../lib/mappers/task.mapper';

export async function createTask(): Promise<Result<Task>> {
  try {
    const res = await httpClient.post<TaskDto>('/tasks');

    return { ok: true, data: toTask(res.data) };
  } catch (error: unknown) {
    return {
      ok: false,
      error: mapTaskError(error),
    };
  }
}

// TODO:
// 추후 React Query 전역 onError와 UI를 연결하여
// UI 레이어에서 에러 메시지를 표시하도록 처리 예정
