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

export function useTaksParams(): TaskCommonParams {
  const router = useRouter();
  const { groupId, taskListId } = router.query;

  // TODO: 테스트 페이지 임시 값 전달용
  if (!groupId || !taskListId) {
    return {
      groupId: 1,
      taskListId: 1,
    };
  }

  return {
    groupId: toNumber(groupId, 'groupId'),
    taskListId: toNumber(taskListId, 'taskListId'),
  };
}
