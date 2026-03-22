import { cn } from '@/shared/lib/cn';
import Dropdown from '@/shared/ui/dropdown';
import { RecurrenceType } from '../model/types/recurrence.type';

type Props = {
  value: RecurrenceType;
  onChange: (value: RecurrenceType) => void;
  selectedDays: number[];
  onChangeDays: (day: number[]) => void;
};

const OPTIONS: { label: string; value: RecurrenceType }[] = [
  { label: '한 번', value: 'ONCE' },
  { label: '매 일', value: 'DAILY' },
  { label: '주 반복', value: 'WEEKLY' },
  { label: '월 반복', value: 'MONTHLY' },
] as const;

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function RecurrenceField({ value, onChange, selectedDays, onChangeDays }: Props) {
  const labelMap = {
    ONCE: '한 번',
    DAILY: '매일',
    WEEKLY: '주 반복',
    MONTHLY: '월 반복',
  };
  return (
    <div className="flex flex-col gap-4">
      <Dropdown>
        <Dropdown.Trigger
          showChevron
          className="h-[48px] w-[160px] justify-between rounded-xl border bg-gray-100 px-4"
        >
          <span>{labelMap[value]}</span>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          {OPTIONS.map((opt) => (
            <Dropdown.Item
              key={opt.value}
              align="left"
              onClick={() => {
                onChange(opt.value);
                if (opt.value !== 'WEEKLY') {
                  onChangeDays([]);
                }
              }}
            >
              {opt.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {value === 'WEEKLY' && (
        <div className="flex gap-2">
          {DAYS.map((day, idx) => {
            const isSelected = selectedDays.includes(idx);

            return (
              <button
                key={day}
                onClick={() => {
                  onChangeDays(
                    selectedDays.includes(idx)
                      ? selectedDays.filter((d) => d !== idx)
                      : [...selectedDays, idx],
                  );
                }}
                className={cn(
                  'h-10 w-10 rounded-lg text-sm',
                  isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500',
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
