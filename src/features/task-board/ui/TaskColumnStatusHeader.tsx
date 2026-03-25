import { IconPlus } from '@/shared/ui/icons';

export type TaskColumnStatusHeaderProps = {
  label: string;
  onAdd?: () => void;
};

/**
 * 컬럼 헤더(상태 라벨 + `+` 버튼) — 정적 UI 기준 컴포넌트
 */
export function TaskColumnStatusHeader({ label, onAdd }: TaskColumnStatusHeaderProps) {
  const isInteractive = typeof onAdd === 'function';

  return (
    <div
      className="
        w-[270px] h-[38px]
        max-[767px]:w-[343px]
        min-[768px]:w-[620px]
        lg:w-[270px]
        rounded-[12px]
        flex items-center justify-between
        bg-background-secondary
        pl-[20px] pr-[8px]
      "
    >
      <span className="text-txt-primary text-sm font-semibold">{label}</span>

      <button
        type="button"
        onClick={onAdd}
        disabled={!isInteractive}
        aria-label="카드 추가"
        className="
          w-[24px] h-[24px]
          rounded-[8px]
          border border-background-tertiary
          bg-background-primary
          flex items-center justify-center
          text-icon-primary
          disabled:opacity-50
        "
      >
        <IconPlus size={12} className="text-icon-primary" aria-hidden="true" />
      </button>
    </div>
  );
}

