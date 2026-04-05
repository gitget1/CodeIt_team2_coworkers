import { clientFetcher } from '@/shared/lib/axios/client-fetcher';
import type { Result } from '@/shared/types/result';
import { mapTaskErrorToFailure } from './mapTaskErrorToFailure';

type UpdateTaskListOrderPath = {
  groupId: number;
  taskListId: number | string;
};

/** [PATCH] /groups/{groupId}/task-lists/{id}/order — 본문 `displayIndex`는 이동할 목표 인덱스 */
export type UpdateTaskListOrderBody = {
  displayIndex: number;
};

/**
 * 할 일 목록(보드 카드) 순서 변경. 스펙: 이동한 목록의 목표 `displayIndex`를 한 번에 반영.
 */
export async function updateTaskListOrder(
  path: UpdateTaskListOrderPath,
  body: UpdateTaskListOrderBody,
): Promise<Result<undefined>> {
  const { groupId, taskListId } = path;
  try {
    await clientFetcher.patch(`/groups/${groupId}/task-lists/${String(taskListId)}/order`, body);
    return { ok: true, data: undefined };
  } catch (error: unknown) {
    return mapTaskErrorToFailure(error);
  }
}
