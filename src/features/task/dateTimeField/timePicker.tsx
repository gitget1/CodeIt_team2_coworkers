import { useMemo, useState } from 'react';
import { cn } from '@/shared/lib/cn';

type Props = {
  value?: string;
  onChange?: (time: string) => void;
  interval?: number;
};

// TODO:
// 자동 스크롤 적용 예정 (사용자가 이미 선택한 시간이 있다면 해당 시간으로 자동 스크롤)
export default function TimePicker({ value, onChange, interval = 30 }: Props) {
  const [period, setPeriod] = useState<'AM' | 'PM'>(() => {
    if (!value) return 'AM';
    const hour = parseInt(value.split(':')[0]);
    return hour >= 12 ? 'PM' : 'AM';
  });

  const times = useMemo(() => {
    const TOTAL_MINUTES_IN_DAY = 24 * 60;
    const count = Math.floor(TOTAL_MINUTES_IN_DAY / interval);

    return Array.from({ length: count }, (_, i) => {
      const totalMinutes = i * interval;
      const h = Math.floor(totalMinutes / 60);
      const m = totalMinutes % 60;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    });
  }, [interval]);

  const filteredTimes = useMemo(() => {
    return times.filter((t) => {
      const hour = Number(t.split(':')[0]);
      return period === 'AM' ? hour < 12 : hour >= 12;
    });
  }, [times, period]);

  return (
    <div className="flex w-full min-w-[260px] gap-3 rounded-2xl border-2 border-blue-500 bg-white p-4 shadow-md sm:-translate-x-1/2">
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setPeriod('AM')}
          className={cn(
            'h-[48px] w-[72px] rounded-xl border text-sm font-medium',
            period === 'AM' ? 'bg-blue-500 text-white' : 'border-gray-200 bg-white text-gray-500',
          )}
        >
          오전
        </button>

        <button
          onClick={() => setPeriod('PM')}
          className={cn(
            'h-[48px] w-[72px] rounded-xl border text-sm font-medium',
            period === 'PM' ? 'bg-blue-500 text-white' : 'border-gray-200 bg-white text-gray-500',
          )}
        >
          오후
        </button>
      </div>

      <div className="max-h-[200px] flex-1 overflow-y-auto rounded-xl border border-gray-200 px-4 py-2">
        <div className="flex flex-col gap-3">
          {filteredTimes.map((t) => {
            const isSelected = value === t;

            return (
              <button
                key={t}
                onClick={() => onChange?.(t)}
                className={cn(
                  'text-left text-lg',
                  isSelected ? 'font-semibold text-blue-500' : 'text-gray-600',
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}