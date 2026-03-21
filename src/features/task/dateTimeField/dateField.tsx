import { useState } from 'react';
import DateInput from './dateInput';
import CalendarPopover from './calendarPopover';

export default function DateField() {
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <DateInput value={date} onClick={() => setOpen(!open)} />
      {open && (
        <div className="absolute left-0 z-50 mt-2 w-max">
          <CalendarPopover
            selected={date}
            onSelect={(d) => {
              setDate(d);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
