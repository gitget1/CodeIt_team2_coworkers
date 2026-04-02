import { useTaskListQuery } from '../hooks/useTaskListQuery';
import { TaskCommonParams } from '../model/params/task.params';
import TaskCreateButton from './create-task/TaskCreateButton';
import TaskItem from './TaskItem';
import TaskDetailPanel from './TaskDetailPanel';
import TaskDeleteModal from './delete-task/TaskDeleteModal';
import TaskUpdateModalContent from './update-task/TaskUpdateModalContent';
import { useTaskModal } from '../hooks/useTaskModal';

type Props = TaskCommonParams & {
  date?: Date;
};

export default function TasksSection({ groupId, taskListId, date }: Props) {
  const { data, isLoading, isError } = useTaskListQuery(
    { groupId, taskListId },
    { date: date?.toISOString() },
  );
  const params = { groupId, taskListId };
  const taskCount = data?.tasks.length ?? 0;
  const {
    detailTask,
    editTask,
    deleteTask,
    openDetail,
    openEdit,
    openDelete,
    closeDetail,
    closeEdit,
    closeDelete,
  } = useTaskModal();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <>
      <section className="flex w-full max-w-[734px] flex-col gap-2">
        <h2 className="text-txt-primary text-lg font-semibold">
          할 일 목록 <span className="text-txt-secondary">({taskCount}개)</span>
        </h2>

        <ul className="flex w-full flex-col gap-2">
          <TaskCreateButton params={params} />
          {!data || data.tasks.length === 0 ? (
            <li className="text-txt-secondary rounded-lg border border-dashed p-4 text-sm">
              할일이 없습니다
            </li>
          ) : (
            data.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                params={params}
                onClick={openDetail}
                onDeleteClick={openDelete}
                onEditClick={openEdit}
              />
            ))
          )}
        </ul>
      </section>
      <TaskDetailPanel task={detailTask} onClose={closeDetail} />
      {deleteTask && (
        <TaskDeleteModal taskId={deleteTask.id} title={deleteTask.title} onClose={closeDelete} />
      )}
      {editTask && (
        <TaskUpdateModalContent task={editTask} params={params} isOpen={true} onClose={closeEdit} />
      )}
    </>
  );
}
