import { useState } from 'react';
import { useTaskListQuery } from '../hooks/useTaskListQuery';
import { TaskCommonParams } from '../model/params/task.params';
import TaskCreateButton from './create-task/TaskCreateButton';
import TaskItem from './TaskItem';
import { Task } from '../model/entities/task.model';
import TaskDetailPanel from './TaskDetailPanel';
import TaskDeleteModal from './delete-task/TaskDeleteModal';
import TaskUpdateModalContent from './update-task/TaskUpdateModalContent';

type Props = TaskCommonParams & {
  date?: string;
};

export default function TaskList({ groupId, taskListId, date }: Props) {
  const { data, isLoading, isError } = useTaskListQuery({ groupId, taskListId }, { date });
  const params = { groupId, taskListId };
  const taskCount = data?.tasks.length ?? 0;
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);

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
                onClick={setDetailTask}
                onDeleteClick={(task) => {
                  setDeleteTask(task);
                }}
                onEditClick={setEditTask}
              />
            ))
          )}
        </ul>
      </section>
      <TaskDetailPanel task={detailTask} onClose={() => setDetailTask(null)} />
      {deleteTask && (
        <TaskDeleteModal
          taskId={deleteTask.id}
          title={deleteTask.title}
          onClose={() => {
            setDeleteTask(null);
          }}
        />
      )}
      {editTask && (
        <TaskUpdateModalContent
          task={editTask}
          params={params}
          isOpen={true}
          onClose={() => setEditTask(null)}
        />
      )}
    </>
  );
}
