import { IconArrowRight } from '@/shared/ui/icons/IconArrowRight';
import { IconArrowLeft } from '@/shared/ui/icons/IconArrowLeft';
import { cn } from '@/shared/lib/cn';

interface MonthSelectorProps {
  currentMonth: string;
  isViewAll: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onToggleViewAll: () => void;
}

export function MonthSelector({
  currentMonth,
  onPrevious,
  onNext,
  onToggleViewAll,
}: MonthSelectorProps) {
  const arrowButtonClasses = cn(
    'flex items-center justify-center shrink-0',
    'h-[16px] w-[16px] rounded-full transition-all',
    'border border-background-tertiary bg-white text-txt-secondary',
    'hover:bg-background-secondary shadow-[0px_15px_50px_-12px_rgba(0,0,0,0.05)]',
  );
  return (
    <div className="flex items-center gap-[13px] py-4">
      <button
        type="button"
        onClick={onPrevious}
        aria-label="이전 달"
        className={arrowButtonClasses}
      >
        <IconArrowLeft size={12} className="block" />
      </button>

      <button
        type="button"
        onClick={onToggleViewAll}
        className={cn(
          'min-w-30 rounded-lg px-3 py-1.5 text-center text-lg font-bold transition-all',
          'text-txt-primary hover:bg-background-secondary',
          'active:text-brand-primary active:bg-brand-secondary active:scale-105',
        )}
      >
        {currentMonth}
      </button>
      <button type="button" onClick={onNext} aria-label="다음 달" className={arrowButtonClasses}>
        <IconArrowRight size={12} className="block" />
      </button>
    </div>
  );
}
