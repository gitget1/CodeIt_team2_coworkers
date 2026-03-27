import Checkbox from '@/shared/ui/checkbox';
import { formatDate } from '@/shared/lib/date';
import { IconCalendar } from '@/shared/ui/icons/IconCalendar';
import { IconRepeat } from '@/shared/ui/icons/IconRepeat';
import { IconComment } from '@/shared/ui/icons/IconComment';
import { RECURRENCE_LABELS } from './recurrence';
import { RecurrenceType } from '../../task/model/types/recurrence.type';

interface HistoryTaskItemProps {
  id: number;
  name: string;
  date: Date;
  frequency?: RecurrenceType;
  commentCount?: number;
}

function MetaItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="text-txt-default flex items-center gap-1 text-xs">
      {icon}
      <span>{children}</span>
    </div>
  );
}

export function HistoryTaskItem({
  id,
  name,
  date,
  frequency,
  commentCount = 0,
}: HistoryTaskItemProps) {
  const checkboxId = `history-item-${id}`;

  return (
    <li className="border-border-primary bg-background-secondary flex items-start justify-between rounded-lg border px-3 py-2">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Checkbox id={checkboxId} size="lg" checked={true} disabled={true} readOnly={true} />
          <label
            htmlFor={checkboxId}
            className="text-txt-disabled cursor-default text-sm line-through decoration-gray-400"
          >
            {name}
          </label>
          {commentCount > 0 && <MetaItem icon={<IconComment />}>{commentCount}</MetaItem>}
        </div>

        <div className="flex items-center gap-2">
          <MetaItem icon={<IconCalendar />}>{date && formatDate(date)}</MetaItem>
          {frequency && frequency !== 'ONCE' && (
            <>
              <span className="bg-txt-secondary h-3 w-px" />
              <MetaItem icon={<IconRepeat />}>{RECURRENCE_LABELS[frequency] || frequency}</MetaItem>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
