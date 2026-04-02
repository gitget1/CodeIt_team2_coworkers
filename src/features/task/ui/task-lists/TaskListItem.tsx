import { TaskListSidebarItem } from './taskListSidebar.types';
import { TaskListMenu } from './TaskListMenu';
import { TaskListProgress } from './TaskListProgress';

type Props = {
  list: TaskListSidebarItem;
  isActive?: boolean;
  onSelect?: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function TaskListItem({ list, isActive, onSelect, onEdit, onDelete }: Props) {
  return (
    <div
      className={`border-background-tertiary flex items-center justify-between rounded-xl border px-4 py-3 ${isActive ? 'bg-blue-100' : 'bg-white'}`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-2">
        <span className="text-md text-txt-primary font-semibold">{list.title}</span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <TaskListProgress completed={list.completedCount} total={list.totalCount} />
        <TaskListMenu onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}
