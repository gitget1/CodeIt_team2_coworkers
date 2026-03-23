import TimeInput from './timeInput';
import TimePicker from './timePicker';

type Props = {
  value?: string;
  onChange: (time: string | undefined) => void;
  className?: string;
  open: boolean;
  onToggle: () => void;
};

export default function TimeField({ value, onChange, className, open, onToggle }: Props) {
  return (
    <div className="relative w-full">
      <TimeInput value={value} onClick={onToggle} className={className} />
      {open && (
        <div className="mt-2 w-full">
          <TimePicker
            value={value}
            onChange={(t) => {
              onChange(t);
            }}
          />
        </div>
      )}
    </div>
  );
}
