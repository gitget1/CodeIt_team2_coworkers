import { cn } from '@/shared/lib/cn';

interface SummaryCardProps {
  title: string;
  count: number;
  isActive?: boolean;
}

export function SummaryCard({ title, count, isActive = false }: SummaryCardProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-brand-primary border-brand-primary text-white'
          : 'border-border-primary text-txt-primary hover:bg-background-secondary bg-white',
      )}
    >
      <span>{title}</span>
      <span className={isActive ? 'text-white' : 'text-brand-primary'}>{count}</span>
      {/* TODO: (추후 API 연동 시) 클릭하면 해당 그룹 히스토리만 필터링되도록 추가 */}
    </button>
  );
}
