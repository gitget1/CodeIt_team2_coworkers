import { Button } from '@/shared/ui/Button';
import { TaskListItem } from './TaskListItem';
import { TaskListSidebarItem } from './taskListSidebar.types';
import { IconPlus } from '@/shared/ui/icons';

type Props = {
  taskLists: TaskListSidebarItem[];
  onCreate: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export function TaskListSidebar({ taskLists, onCreate, onEdit, onDelete }: Props) {
  return (
    <aside className="w-[280px] rounded-2xl bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">할 일</h2>

      <div className="flex flex-col gap-3">
        {taskLists.map((list) => (
          <TaskListItem
            key={list.id}
            list={list}
            onEdit={() => onEdit(list.id)}
            onDelete={() => onDelete(list.id)}
          />
        ))}
      </div>

      <Button
        variant="primary"
        onClick={onCreate}
        className="text-md mt-4 flex w-full items-center justify-center rounded-xl border py-2"
        leftIcon={<IconPlus size={16} />}
      >
        할 일 추가
      </Button>
    </aside>
  );
}
