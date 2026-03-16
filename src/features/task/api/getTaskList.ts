import httpClient from '@/shared/api/httpClient';
import { toTaskList } from '../lib/mappers/task.mapper';
import type { TaskList } from '../model/entities/task.model';
import type { TaskListDto } from '../model/dto/task.dto';

// 생성, 업데이트, 삭제등 중복되는 파라미터는 공통으로 묶어서 작업 예정
export interface GetTaskListParams {
  teamId: number;
  groupId: number;
  taskListId: number;
  date?: Date;
}
// TODO: 클라이언트에서는 Date를 받고, API 호출 시 변환하도록 정리 필요
// 날짜만 필요한곳, 시간까지 필요한곳이 필요로 하는곳이 다름

// TODO: API 에러 핸들링 필요
export async function getTaskList({
  teamId,
  groupId,
  taskListId,
  date,
}: GetTaskListParams): Promise<TaskList> {
  const { data } = await httpClient.get<TaskListDto>(
    `/${teamId}/groups/${groupId}/task-lists/${taskListId}`,
    {
      params: {
        date,
      },
    },
  );

  return toTaskList(data);
}
