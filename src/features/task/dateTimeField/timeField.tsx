import { useState } from 'react';
import TimeInput from './timeInput';
import TimePicker from './timePicker';

type Props = {
  value?: string;
  onChange: (time: string | undefined) => void;
};

export default function TimeField({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <TimeInput value={value} onClick={() => setOpen(!open)} />

      {open && (
        <div className="absolute left-0 z-50 mt-2 w-max">
          <TimePicker
            value={value}
            onChange={(t) => {
              onChange(t);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}