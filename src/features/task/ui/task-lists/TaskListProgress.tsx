import { IconProgress } from "@/shared/ui/icons";

type Props = {
  completed: number;
  total: number;
};

export function TaskListProgress({ completed, total }: Props) {
  const progress = total === 0 ? 0 : completed / total;
  return (
    <div className="flex items-center gap-1.5 text-[14px] font-normal text-[#5189FA]">
      <IconProgress size={14} progress={progress} />
      <span>
        {completed}/{total}
      </span>
    </div>
  );
}
