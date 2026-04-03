import { useRouter } from 'next/router';
import { TaskCommonParams } from '../model/params/task.params';

function toNumber(value: string | string[] | undefined, name: string): number {
  if (!value) {
    throw new Error(`${name} is required`);
  }
  const num = Number(value);

  if (Number.isNaN(num)) {
    throw new Error(`${name} is invalid`);
  }
  return num;
}

export function useTaskParams(): TaskCommonParams {
  const router = useRouter();
  const { groupId, teamId, taskListId } = router.query;
  const rawGroupId = groupId ?? teamId;
  if (!rawGroupId || !taskListId) {
    return {
      groupId: 1,
      taskListId: 1,
    };
  }

  return {
    groupId: toNumber(rawGroupId, 'groupId'),
    taskListId: toNumber(taskListId, 'taskListId'),
  };
}
