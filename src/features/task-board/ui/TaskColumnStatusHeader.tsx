import { IconPlus } from '@/shared/ui/icons';

export type TaskColumnStatusHeaderProps = {
  label: string;
  onAddTask?: () => void;
};

/**
 * 컬럼 헤더(상태 라벨 + `+` 버튼) — 정적 UI 기준 컴포넌트
 */
export function TaskColumnStatusHeader({ label, onAddTask }: TaskColumnStatusHeaderProps) {
  const isDisabled = !!onAddTask;

  return (
    <div
      className="
        flex h-[38px] w-full max-w-full shrink-0 items-center justify-between
        rounded-[12px] border border-solid border-background-tertiary/80
        bg-background-tertiary
        pl-5 pr-2
      "
    >
      <span className="text-sm font-semibold text-txt-primary">{label}</span>

      <button
        type="button"
        onClick={onAddTask}
        disabled={!isDisabled}
        aria-label="카드 추가"
        className="
          flex h-6 w-6 shrink-0 items-center justify-center
          rounded-lg border border-solid border-background-tertiary
          bg-background-primary text-brand-primary
          disabled:opacity-50
        "
      >
        <IconPlus size={12} className="text-brand-primary" aria-hidden="true" />
      </button>
    </div>
  );
}

