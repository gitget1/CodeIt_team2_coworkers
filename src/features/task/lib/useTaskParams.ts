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
  const { groupId, taskListId } = router.query;

  /**
   * TODO:
   * 테스트 페이지에서 router.query 값이 없기 때문에 임시로 기본값 반환
   * 추후 groupId, taskListId가 정상적으로 주입되면 해당 로직 제거 예정
   */
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
