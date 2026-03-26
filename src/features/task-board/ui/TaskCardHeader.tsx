import type { HTMLAttributes } from 'react';
import { IconArrowDown, IconDone, IconKebab, IconProgress } from '@/shared/ui/icons';
import { cn } from '@/shared/lib/cn';

type TaskCardHeaderProps = {
  cardName: string;
  collapsed: boolean;
  isFullyCompleted: boolean;
  checkedTaskCount: number;
  cardTaskCount: number;
  onToggleCollapsed: () => void;
  /** dnd-kit: 카드 드래그 핸들 ref */
  activatorRef?: (node: HTMLElement | null) => void;
  /** dnd-kit: 드래그 어트리뷰트(aria/role 등) */
  dragAttributes?: HTMLAttributes<HTMLDivElement>;
  /** dnd-kit: 드래그 리스너(포인터 이벤트 등) */
  dragListeners?: Record<string, unknown>;
};

export function TaskCardHeader({
  cardName,
  collapsed,
  isFullyCompleted,
  checkedTaskCount,
  cardTaskCount,
  onToggleCollapsed,
  activatorRef,
  dragAttributes,
  dragListeners,
}: TaskCardHeaderProps) {
  const progressRatio = cardTaskCount === 0 ? 0 : checkedTaskCount / cardTaskCount;

  return (
    <div
      ref={activatorRef}
      {...dragAttributes}
      {...dragListeners}
      className={cn('flex items-center gap-3 translate-y-[-4px] max-[767px]:translate-y-0', 'cursor-grab')}
    >
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? '접힌 카드 펼치기' : '카드 접기'}
          className={cn(
            'w-[24px] h-[24px] rounded-[8px] p-0 text-icon-primary hover:bg-background-secondary',
            'flex items-center justify-center shrink-0 -translate-x-[6px]',
          )}
        >
          <IconArrowDown size={20} className={collapsed ? 'rotate-180' : undefined} />
        </button>

        <div className="truncate text-sm font-semibold text-txt-primary">{cardName}</div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <div className="flex items-center gap-1 text-[#74A1FB]">
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
              progress={progressRatio}
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
          aria-label="카드 옵션"
          className="rounded-[8px] p-1 text-icon-primary hover:bg-background-secondary"
        >
          <IconKebab size={20} />
        </button>
      </div>
    </div>
  );
}
