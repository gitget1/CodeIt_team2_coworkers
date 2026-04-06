import { useCallback, useLayoutEffect, useRef } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/shared/lib/cn';
import type { TaskBoardTaskGroup } from '../model/taskBoard.types';
import { TaskCard } from './TaskCard';

type TaskSortableCardItemProps = {
  taskGroup: TaskBoardTaskGroup;
  onTaskToggle?: (taskId: string, checked: boolean) => void;
  onEditCard?: (taskGroupId: string, currentTitle: string) => void;
  onDeleteCard?: (taskGroupId: string) => void;
  onOpenTaskList?: (taskGroupId: string) => void;
  activeTaskGroupId?: string | null;
  dropIndicatorId?: string | null;
  /** 첫 카드 `before` 삽입선을 컬럼 상단에서 그릴 때 중복 방지 */
  suppressDropIndicatorBefore?: boolean;
};

function DropIndicatorLine({ edge }: { edge: 'top' | 'bottom' }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute left-0 right-0 h-[3px] rounded-full bg-brand-primary',
        edge === 'top' ? '-top-[6px]' : '-bottom-[6px]',
      )}
      aria-hidden
    />
  );
}

export function TaskSortableCardItem({
  taskGroup,
  onTaskToggle,
  onEditCard,
  onDeleteCard,
  onOpenTaskList,
  activeTaskGroupId,
  dropIndicatorId,
  suppressDropIndicatorBefore = false,
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

  const nodeRef = useRef<HTMLDivElement | null>(null);
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      nodeRef.current = node;
      setNodeRef(node);
    },
    [setNodeRef],
  );

  useLayoutEffect(() => {
    const el = nodeRef.current;
    if (!el) return;
    el.style.transform = CSS.Transform.toString(transform) ?? '';
    el.style.transition = isDragging ? 'none' : (transition ?? '');
  }, [transform, transition, isDragging]);

  const showDropIndicatorBefore =
    !suppressDropIndicatorBefore &&
    dropIndicatorId === `before:${taskGroup.id}` &&
    activeTaskGroupId !== taskGroup.id;
  const showDropIndicatorAfter =
    dropIndicatorId === `after:${taskGroup.id}` && activeTaskGroupId !== taskGroup.id;

  return (
    <div
      ref={setRef}
      className={cn(
        'relative w-full max-w-full will-change-transform',
        !isDragging && 'transition-opacity duration-200 ease-out',
        isDragging && 'opacity-60',
      )}
    >
      {showDropIndicatorBefore && <DropIndicatorLine edge="top" />}
      <TaskCard
        taskGroup={taskGroup}
        setActivatorNodeRef={setActivatorNodeRef}
        dragAttributes={attributes}
        dragListeners={listeners}
        onTaskToggle={onTaskToggle}
        onEditCard={(group) => onEditCard?.(group.id, group.name)}
        onDeleteCard={(group) => onDeleteCard?.(group.id)}
        onOpenTaskList={(group) => onOpenTaskList?.(group.id)}
      />
      {showDropIndicatorAfter && <DropIndicatorLine edge="bottom" />}
    </div>
  );
}
