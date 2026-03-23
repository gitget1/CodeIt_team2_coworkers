import DateInput from './dateInput';
import CalendarPopover from './calendarPopover';

type Props = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  className?: string;
  open: boolean;
  onToggle: () => void;
};

export default function DateField({ value, onChange, className, open, onToggle }: Props) {
  return (
    <div className="relative">
      <DateInput value={value} onClick={onToggle} className={className} />
      {open && (
        <div className="mt-2 w-full">
          <CalendarPopover
            selected={value}
            onSelect={(d) => {
              onChange(d);
            }}
          />
        </div>
      )}
    </div>
  );
}
