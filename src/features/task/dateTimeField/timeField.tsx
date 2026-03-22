import { useState } from 'react';
import TimeInput from './timeInput';
import TimePicker from './timePicker';

export default function TimeField() {
  const [time, setTime] = useState<string>();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <TimeInput value={time} onClick={() => setOpen(!open)} />

      {open && (
        <div className="absolute left-0 z-50 mt-2 w-max">
          <TimePicker
            value={time}
            onChange={(t) => {
              setTime(t);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}