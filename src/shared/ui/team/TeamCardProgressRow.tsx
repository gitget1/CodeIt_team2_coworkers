import type { ReactNode } from 'react';
import { StripedProgressBar } from '@/shared/ui/progress/StripedProgressBar';
import { getSafeProgressPercent } from './teamCard.guards';

export type TeamCardProgressRowProps = {
  teamName: string;
  progressPercent: number;
  /** 진행률 바 바로 오른쪽 (예: 톱니바퀴 설정 메뉴) */
  trailing?: ReactNode;
};

export function TeamCardProgressRow({ teamName, progressPercent, trailing }: TeamCardProgressRowProps) {
  const safeProgressPercent = getSafeProgressPercent(progressPercent);

  return (
    <div className="mt-5 flex min-w-0 items-center gap-2 md:gap-3">
      <StripedProgressBar
        value={safeProgressPercent}
        className="h-[20px] min-h-0 min-w-0 flex-1 rounded-[1000px]"
        progressLabel={`${teamName} 오늘 진행률`}
      />
      {trailing != null ? <div className="shrink-0">{trailing}</div> : null}
    </div>
  );
}
