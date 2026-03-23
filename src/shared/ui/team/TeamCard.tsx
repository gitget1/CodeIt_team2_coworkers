import { cn } from '@/shared/lib/cn';
import { TeamCardProgressRow } from './TeamCardProgressRow';
import { TeamCardStatsSection } from './TeamCardStatsSection';

export type TeamCardProps = {
  teamName: string;
  /** 0–100 */
  progressPercent: number;
  todayTaskCount: number;
  completedTaskCount: string | number;
  onEditTeam?: () => void;
  onDeleteTeam?: () => void;
  /** 기본: 너비 1120px·최소 높이 239px, radius 20px */
  className?: string;
  /** 통계 블록(오늘의 할 일·완료) 래퍼 커스텀 */
  statsClassName?: string;
};

export function TeamCard({
  teamName,
  progressPercent,
  todayTaskCount,
  completedTaskCount,
  onEditTeam,
  onDeleteTeam,
  className,
  statsClassName,
}: TeamCardProps) {
  return (
    <article
      className={cn(
        'box-border min-h-[239px] w-[1120px] max-w-full rounded-[20px] border border-background-tertiary/60 bg-background-primary p-5 shadow-[0_4px_24px_rgba(15,23,42,0.06)]',
        className,
      )}
    >
      <header>
        <h3 className="text-2xl font-bold leading-[28px] text-txt-tertiary">{teamName}</h3>
      </header>

      <TeamCardStatsSection
        progressPercent={progressPercent}
        todayTaskCount={todayTaskCount}
        completedTaskCount={completedTaskCount}
        statsClassName={statsClassName}
      />

      <TeamCardProgressRow
        teamName={teamName}
        progressPercent={progressPercent}
        onEditTeam={onEditTeam}
        onDeleteTeam={onDeleteTeam}
      />
    </article>
  );
}
