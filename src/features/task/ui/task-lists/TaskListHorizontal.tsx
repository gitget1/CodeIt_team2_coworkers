import { TaskListSidebarItem } from './taskListSidebar.types';
import { TaskListMenu } from './TaskListMenu';
import { IconProgress, IconPlus } from '@/shared/ui/icons';
import { Button } from '@/shared/ui/Button';

type Props = {
  taskLists: TaskListSidebarItem[];
  selectedId: number;
  onSelect: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
};

export function TaskListHorizontal({
  taskLists,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
  onCreate,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex min-w-0 flex-1 pb-2">
        <div className="flex gap-3 overflow-x-auto whitespace-nowrap">
          {taskLists.map((list) => {
            const isActive = list.id === selectedId;

            return (
              <div
                key={list.id}
                onClick={() => onSelect(list.id)}
                className={`border-background-tertiary flex min-w-[140px] shrink-0 cursor-pointer items-center justify-between rounded-xl border px-3 py-2 transition ${
                  isActive ? 'border-blue-500 bg-blue-50' : 'bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelect(list.id)}
                  className="flex flex-1 cursor-pointer flex-col text-left"
                >
                  <span className="text-txt-primary text-sm font-medium">{list.title}</span>

                  <div className="mt-1 flex items-center gap-1 text-xs text-blue-500">
                    <IconProgress
                      size={14}
                      progress={list.totalCount === 0 ? 0 : list.completedCount / list.totalCount}
                    />
                    <span>
                      {list.completedCount}/{list.totalCount}
                    </span>
                  </div>
                </button>
                <div onClick={(e) => e.stopPropagation()}>
                  <TaskListMenu onEdit={() => onEdit(list.id)} onDelete={() => onDelete(list.id)} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        variant="outline"
        onClick={onCreate}
        className="flex shrink-0 items-center justify-center rounded-xl py-2 text-sm"
        leftIcon={<IconPlus size={16} />}
      >
        추가하기
      </Button>
    </div>
  );
}
