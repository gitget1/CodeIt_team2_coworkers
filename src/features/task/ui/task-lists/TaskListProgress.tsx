import { IconProgress } from '@/shared/ui/icons';

type Props = {
  completed: number;
  total: number;
};

export function TaskListProgress({ completed, total }: Props) {
  const progress = total === 0 ? 0 : completed / total;
  return (
    <div className="text-md text-brand-primary font-regular flex items-center gap-1.5">
      <IconProgress size={16} progress={progress} />
      <span>
        {completed}/{total}
      </span>
    </div>
  );
}
