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
    <div className="flex items-end justify-between gap-4 md:gap-6">
      <div className="shrink-0">
        <p className="text-[12px] font-medium leading-[14px] text-txt-default">오늘의 진행 상황</p>
        <p className="mt-1 text-[32px] font-bold leading-[38px] text-brand-primary tabular-nums">
          {safeProgressPercent}%
        </p>
      </div>

      <div
        className={cn(
          'flex h-[46px] w-[126px] min-w-0 items-stretch justify-end gap-4',
          statsClassName,
        )}
      >
        <div className="flex flex-col items-center text-center">
          <span className="whitespace-nowrap text-[12px] font-medium leading-[14px] text-txt-default">오늘의 할 일</span>
          <span className="mt-1 text-[24px] font-bold leading-[28px] tabular-nums text-txt-secondary">
            {todayTaskCount}
          </span>
        </div>
        <div className="w-px shrink-0 bg-background-tertiary" aria-hidden="true" />
        <div className="flex flex-col items-center text-center">
          <span className="whitespace-nowrap text-[12px] font-medium leading-[14px] text-txt-default">
            완료<span aria-hidden="true">🙌</span>
          </span>
          <span className="mt-1 text-[24px] font-bold leading-[28px] tabular-nums text-brand-primary">
            {completedTaskCount}
          </span>
        </div>
      </div>
    </div>
  );
}
