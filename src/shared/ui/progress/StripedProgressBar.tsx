import { cn } from '@/shared/lib/cn';
import { clamp } from '@/shared/lib/clamp';

type Props = {
  value: number;
  className?: string;
  progressLabel?: string;
};

export function StripedProgressBar({ value, className, progressLabel }: Props) {
  const clamped = clamp(value, 0, 100);
  const widthVar = { '--progress-width': `${clamped}%` } as React.CSSProperties;

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={progressLabel ?? '진행률'}
      className={cn('relative h-[27px] w-full min-w-0 overflow-hidden rounded-full', className)}
    >
      <div
        className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,_#e2e8f0_0,_#e2e8f0_4px,_#f1f5f9_4px,_#f1f5f9_8px)]"
        aria-hidden="true"
      />
      <div
        className="relative z-[1] h-full w-[var(--progress-width)] rounded-full bg-brand-primary transition-[width] duration-300 ease-out"
        style={widthVar}
      />
    </div>
  );
}
