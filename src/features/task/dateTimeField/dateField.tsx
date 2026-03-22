import { useState } from 'react';
import DateInput from './dateInput';
import CalendarPopover from './calendarPopover';

type Props = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
};

export default function DateField({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <DateInput value={value} onClick={() => setOpen(!open)} />
      {open && (
        <div className="absolute left-0 z-50 mt-2 w-max">
          <CalendarPopover
            selected={value}
            onSelect={(d) => {
              onChange(d);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
