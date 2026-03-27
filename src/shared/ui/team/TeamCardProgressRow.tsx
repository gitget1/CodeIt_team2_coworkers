import { StripedProgressBar } from '@/shared/ui/progress/StripedProgressBar';
import { getSafeProgressPercent } from './teamCard.guards';

export type TeamCardProgressRowProps = {
  teamName: string;
  progressPercent: number;
};

export function TeamCardProgressRow({ teamName, progressPercent }: TeamCardProgressRowProps) {
  const safeProgressPercent = getSafeProgressPercent(progressPercent);

  return (
    <div className="mt-5 flex min-w-0 items-center">
      <StripedProgressBar
        value={safeProgressPercent}
        className="h-[20px] w-[322px] min-w-0 max-w-full rounded-[1000px] md:w-full"
        progressLabel={`${teamName} 오늘 진행률`}
      />
    </div>
  );
}
