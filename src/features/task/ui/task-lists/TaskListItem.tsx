import { TaskListSidebarItem } from './taskListSidebar.types';
import { TaskListMenu } from './TaskListMenu';
import { TaskListProgress } from './TaskListProgress';

type Props = {
  list: TaskListSidebarItem;
  onEdit: () => void;
  onDelete: () => void;
};

export function TaskListItem({ list, onEdit, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-background-tertiary bg-white px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="text-md font-semibold text-txt-primary">{list.title}</span>
      </div>
      <div className="flex flex-row items-center justify-content gap-2">
        <TaskListProgress completed={list.completedCount} total={list.totalCount} />
        <TaskListMenu onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}
