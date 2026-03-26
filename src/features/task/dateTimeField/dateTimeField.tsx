import { useState } from 'react';
import DateInput from './dateInput';
import TimeInput from './timeInput';
import DatePopover from './datePopover';
import TimePopover from './timePopover';

type Props = {
  value?: {
    date?: Date;
    time?: string;
  };
  onChange: (value: { date?: Date; time?: string }) => void;
};

export default function DateTimeField({ value, onChange }: Props) {
  const [open, setOpen] = useState<'date' | 'time' | null>(null);
  const TASK_INPUT_STYLE =
    'text-txt-default !font-regular border-background-tertiary rounded-xl text-lg';
  const date = value?.date;
  const time = value?.time;

  return (
    <div className="w-full">
      <div className="flex gap-2">
        <div className="w-[204px]">
          <DateInput value={date} onClick={() => setOpen('date')} className={TASK_INPUT_STYLE} />
        </div>
        <div className="w-[124px]">
          <TimeInput value={time} onClick={() => setOpen('time')} className={TASK_INPUT_STYLE} />
        </div>
      </div>

      {open === 'date' && (
        <div className="mt-2 w-full">
          <DatePopover
            selected={date}
            onSelect={(d) => {
              onChange({
                ...value,
                date: d,
              });
              setOpen(null);
            }}
          />
        </div>
      )}

      {open === 'time' && (
        <div className="mt-2 w-full">
          <TimePopover
            value={time}
            onChange={(t) => {
              onChange({
                ...value,
                time: t,
              });
              setOpen(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
