import type { MouseEvent } from 'react';
import { IconArrowDown, IconDone, IconKebab, IconProgress } from '@/shared/ui/icons';
import { cn } from '@/shared/lib/cn';
import Dropdown from '@/shared/ui/dropdown';
import type { SortableDragAttributes, SortableDragListeners } from './TaskCard';

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
  dragAttributes?: SortableDragAttributes;
  /** dnd-kit: 드래그 리스너(포인터 이벤트 등) */
  dragListeners?: SortableDragListeners;
  onEditCard?: () => void;
  onDeleteCard?: () => void;
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
  onEditCard,
  onDeleteCard,
}: TaskCardHeaderProps) {
  const progressRatio = cardTaskCount === 0 ? 0 : checkedTaskCount / cardTaskCount;

  return (
    <div
      ref={activatorRef}
      {...dragAttributes}
      {...dragListeners}
      className={cn('flex w-full cursor-grab items-center gap-3')}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <button
          type="button"
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            onToggleCollapsed();
          }}
          aria-label={collapsed ? '접힌 카드 펼치기' : '카드 접기'}
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] p-0 text-icon-primary',
            'hover:bg-background-secondary -translate-x-[6px]',
          )}
        >
          <IconArrowDown size={20} className={collapsed ? 'rotate-180' : undefined} />
        </button>

        <div className="min-w-0 truncate text-sm font-semibold leading-none text-txt-primary">
          {cardName}
        </div>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-2">
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
          <span className="text-sm font-semibold leading-none text-[#74A1FB] tabular-nums">
            {checkedTaskCount}/{cardTaskCount}
          </span>
        </div>

        <Dropdown>
          <Dropdown.Trigger
            aria-label="카드 옵션"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] p-0 text-icon-primary hover:bg-background-secondary"
            onClick={(event: MouseEvent<HTMLButtonElement>) => event.stopPropagation()}
          >
            <IconKebab size={20} />
          </Dropdown.Trigger>
          <Dropdown.Menu align="right" className="z-20 min-w-[120px] overflow-hidden rounded-xl">
            <div
              role="group"
              onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
              onMouseDown={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
            >
              <Dropdown.Item align="left" className="px-3 py-2 text-sm" onClick={onEditCard}>
                수정하기
              </Dropdown.Item>
              <Dropdown.Item
                align="left"
                className="px-3 py-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={onDeleteCard}
              >
                삭제하기
              </Dropdown.Item>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
