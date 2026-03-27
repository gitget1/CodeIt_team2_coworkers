import { IconArrowRight } from '@/shared/ui/icons/IconArrowRight';
import { IconArrowLeft } from '@/shared/ui/icons/IconArrowLeft';

export function MonthSelector({ currentMonth }: { currentMonth: string }) {
  return (
    <div className="flex items-center gap-6 py-4">
      <button
        type="button"
        aria-label="이전 달"
        className="text-txt-secondary hover:text-txt-primary"
      >
        <IconArrowLeft size={24} />
      </button>
      <span className="text-txt-primary text-lg font-bold">{currentMonth}</span>
      <button
        type="button"
        aria-label="다음 달"
        className="text-txt-secondary hover:text-txt-primary"
      >
        <IconArrowRight size={24} />
      </button>
    </div>
  );
}
