import { cn } from '@/shared/lib/cn';
import { getSafeProgressPercent } from './teamCard.guards';

export type TeamCardStatsSectionProps = {
  progressPercent: number;
  todayTaskCount: number;
  completedTaskCount: string | number;
  statsClassName?: string;
};

export function TeamCardStatsSection({
  progressPercent,
  todayTaskCount,
  completedTaskCount,
  statsClassName,
}: TeamCardStatsSectionProps) {
  const safeProgressPercent = getSafeProgressPercent(progressPercent);

  return (
    <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="shrink-0">
        <p className="text-md text-txt-default">오늘의 진행 상황</p>
        <p className="mt-1 text-3xl font-bold leading-none text-brand-primary tabular-nums">
          {safeProgressPercent}%
        </p>
      </div>

      <div
        className={cn(
          'flex min-w-0 flex-1 items-stretch justify-end gap-0 pr-12 sm:max-w-[280px]',
          statsClassName,
        )}
      >
        <div className="flex flex-1 flex-col items-center px-3 text-center sm:px-4">
          <span className="text-lg text-txt-default">오늘의 할 일</span>
          <span className="mt-1 text-3xl font-bold leading-none tabular-nums text-txt-secondary">
            {todayTaskCount}
          </span>
        </div>
        <div className="w-px shrink-0 bg-background-tertiary" aria-hidden="true" />
        <div className="flex flex-1 flex-col items-center px-3 text-center sm:px-4">
          <span className="text-lg text-txt-default">
            완료<span aria-hidden="true">🙌</span>
          </span>
          <span className="mt-1 text-3xl font-bold leading-none tabular-nums text-brand-primary">
            {completedTaskCount}
          </span>
        </div>
      </div>
    </div>
  );
}
