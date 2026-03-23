import { cn } from '@/shared/lib/cn';

type Props = {
  /** 0–100 */
  value: number;
  className?: string;
  'aria-label'?: string;
};

const STRIPE_BG =
  'repeating-linear-gradient(-45deg, #e2e8f0 0, #e2e8f0 4px, #f1f5f9 4px, #f1f5f9 8px)';

export function StripedProgressBar({ value, className, 'aria-label': ariaLabel }: Props) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel ?? '진행률'}
      className={cn('relative h-[27px] w-full min-w-0 overflow-hidden rounded-full', className)}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: STRIPE_BG }}
        aria-hidden="true"
      />
      <div
        className="relative z-[1] h-full rounded-full bg-brand-primary transition-[width] duration-300 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
