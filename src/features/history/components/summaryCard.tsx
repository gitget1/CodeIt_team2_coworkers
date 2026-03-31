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
        'flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-brand-primary border-brand-primary text-white'
          : 'border-border-primary text-txt-primary hover:bg-background-secondary bg-white',
      )}
    >
      <span aria-hidden="true" className="max-w-25 truncate md:max-w-35">
        {title}
      </span>
      <span className={isActive ? 'text-white' : 'text-brand-primary'}>{count}</span>
    </button>
  );
}
