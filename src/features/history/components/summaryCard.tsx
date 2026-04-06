import { cn } from '@/shared/lib/cn';

interface SummaryCardProps {
  title: string;
  count: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function SummaryCard({ title, count, isActive = false, onClick }: SummaryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        'flex shrink-0 cursor-pointer items-center rounded-full border font-medium transition-colors',
        'gap-1.5 px-3 py-1.5 text-xs',
        'md:gap-2 md:px-4 md:py-2 md:text-sm',
        isActive
          ? 'bg-brand-primary border-brand-primary text-white'
          : 'text-txt-primary hover:bg-background-secondary border-slate-200 bg-white',
      )}
    >
      <span aria-hidden="true" className="max-w-20 truncate md:max-w-35">
        {title}
      </span>
      <span className={isActive ? 'text-white' : 'text-brand-primary'}>{count}</span>
    </button>
  );
}
