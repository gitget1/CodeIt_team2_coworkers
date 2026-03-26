import type { CSSProperties } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/shared/lib/cn';
import type { TaskBoardTaskGroup } from '../model/taskBoard.types';
import { TaskCard } from './TaskCard';

type TaskSortableCardItemProps = {
  taskGroup: TaskBoardTaskGroup;
  onTaskToggle?: (taskId: string, checked: boolean) => void;
  activeTaskGroupId?: string | null;
  dropIndicatorId?: string | null;
};

export function TaskSortableCardItem({
  taskGroup,
  onTaskToggle,
  activeTaskGroupId,
  dropIndicatorId,
}: TaskSortableCardItemProps) {
  const id: UniqueIdentifier = taskGroup.id;
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    transition: {
      duration: 260,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const showDropIndicatorBefore = dropIndicatorId === `before:${taskGroup.id}` && activeTaskGroupId !== taskGroup.id;
  const showDropIndicatorAfter = dropIndicatorId === `after:${taskGroup.id}` && activeTaskGroupId !== taskGroup.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative will-change-transform transition-[opacity,transform] duration-200 ease-out',
        isDragging && 'opacity-60 scale-[1.01]',
      )}
    >
      {showDropIndicatorBefore && (
        <div className="pointer-events-none absolute -top-[6px] left-0 right-0 h-[3px] rounded-full bg-brand-primary" />
      )}
      <TaskCard
        taskGroup={taskGroup}
        setActivatorNodeRef={setActivatorNodeRef}
        dragAttributes={attributes as any}
        dragListeners={listeners as any}
        onTaskToggle={onTaskToggle}
      />
      {showDropIndicatorAfter && (
        <div className="pointer-events-none absolute -bottom-[6px] left-0 right-0 h-[3px] rounded-full bg-brand-primary" />
      )}
    </div>
  );
}
