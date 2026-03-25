import { useEffect, useMemo, useState } from 'react';
import { IconArrowDown, IconDone, IconKebab, IconProgress } from '@/shared/ui/icons';
import { cn } from '@/shared/lib/cn';
import type { TaskBoardColumnStatus, TaskBoardTask, TaskBoardTaskGroup } from '../model/taskBoard.types';
import { TaskRow } from './TaskRow';

export type TaskCardProps = {
  taskGroup: TaskBoardTaskGroup;
  columnStatus?: TaskBoardColumnStatus;
  initialCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  onTaskToggle?: (taskId: string, checked: boolean) => void;
  onKebabClick?: () => void;
};

export function TaskCard({
  taskGroup,
  columnStatus = 'DONE',
  initialCollapsed = false,
  onCollapseChange,
  onTaskToggle,
  onKebabClick,
}: TaskCardProps) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [tasks, setTasks] = useState<TaskBoardTask[]>(taskGroup.tasks);

  useEffect(() => {
    setCollapsed(initialCollapsed);
    setTasks(taskGroup.tasks);
  }, [taskGroup.id, taskGroup.tasks, initialCollapsed]);

  const { checkedTaskCount, cardTaskCount } = useMemo(() => {
    const total = tasks.length;
    const checked = tasks.reduce((acc, t) => acc + (t.completed ? 1 : 0), 0);
    return { checkedTaskCount: checked, cardTaskCount: total };
  }, [tasks]);

  const isFullyCompleted = cardTaskCount > 0 && checkedTaskCount === cardTaskCount;

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    onCollapseChange?.(next);
  };

  const handleTaskToggle = (taskId: string, checked: boolean) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: checked } : t)));
    onTaskToggle?.(taskId, checked);
  };

  return (
    <div
      className={cn(
        'w-[270px] rounded-[12px] border border-background-tertiary bg-background-primary flex flex-col',
        'max-[767px]:w-[343px] min-[768px]:w-[620px] lg:w-[270px]',
        collapsed
          ? 'h-[54px] gap-0 pl-[20px] pr-[12px] pt-[16px] pb-0'
          : 'min-h-[151px] gap-[10px] pl-[20px] pr-[16px] pt-[16px] pb-[24px]',
      )}
    >
      <div className="flex items-center gap-3 translate-y-[-4px] max-[767px]:translate-y-0">
        {/* 카드 이름 옆의 접힘/펼침 버튼 */}
        <div className="flex min-w-0 items-center gap-2 ">
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-label={collapsed ? '접힌 카드 펼치기' : '카드 접기'}
            className="
              w-[24px] h-[24px]
              rounded-[8px] p-0
              text-icon-primary hover:bg-background-secondary
              flex items-center justify-center
              shrink-0
              -translate-x-[6px]
            "
          >
            <IconArrowDown size={20} className={collapsed ? 'rotate-180' : undefined} />
          </button>

          <div className="truncate text-sm font-semibold text-txt-primary">{taskGroup.name}</div>
        </div>

            {/* 진행률 + 케밥 */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-1 text-[#74A1FB]">
            {/* 완료 전까지는 무조건 progress, 전부 완료면 done */}
            {isFullyCompleted ? (
              <IconDone
                size={16}
                className="text-[#74A1FB]"
                animateOnMount
                key={`done-${checkedTaskCount}/${cardTaskCount}`}
              />
            ) : (
              <IconProgress
                size={16}
                className="shrink-0"
                progress={cardTaskCount === 0 ? 0 : checkedTaskCount / cardTaskCount}
                animateOnMount
                key={`progress-${checkedTaskCount}/${cardTaskCount}`}
              />
            )}
            <span className="text-sm font-semibold leading-none text-[#74A1FB]">
              {checkedTaskCount}/{cardTaskCount}
            </span>
          </div>

          <button
            type="button"
            onClick={onKebabClick}
            aria-label="카드 옵션"
            className="rounded-[8px] p-1 text-icon-primary hover:bg-background-secondary"
          >
            <IconKebab size={20} />
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="flex-1 overflow-visible">
          <div className="flex flex-col gap-[10px]">
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} onToggle={(checked) => handleTaskToggle(task.id, checked)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

