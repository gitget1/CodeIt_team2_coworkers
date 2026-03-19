import { useId, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { checkboxCheckedSrc, checkboxEmptySrc } from './checkboxAssets';
import { CheckboxProps } from './Checkbox.types';

const ICON_SIZE_PX = {
  sm: 12,
  lg: 16,
} as const;

export function Checkbox({
  checked,
  defaultChecked,
  onChange,
  label,
  size = 'sm',
  disabled,
  className,
  id,
  ...inputProps
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  const isControlled = checked != null;
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked ?? false);
  const resolvedChecked = isControlled ? checked : uncontrolledChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextChecked = e.target.checked;
    if (!isControlled) setUncontrolledChecked(nextChecked);
    onChange?.(nextChecked, e);
  };

  const outerSrc = resolvedChecked ? checkboxCheckedSrc : checkboxEmptySrc;
  const iconSizePx = ICON_SIZE_PX[size];

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        'inline-flex items-center gap-2 select-none cursor-pointer',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      aria-disabled={disabled || undefined}
    >
      <input
        {...inputProps}
        id={checkboxId}
        type="checkbox"
        className="sr-only"
        checked={resolvedChecked}
        disabled={disabled}
        aria-checked={resolvedChecked}
        onChange={handleChange}
      />

      <span
        className="relative inline-flex items-center justify-center"
        aria-hidden
        style={{ width: iconSizePx, height: iconSizePx }}
      >
        <img src={outerSrc} alt="" width={iconSizePx} height={iconSizePx} className="block" />
      </span>

      {label != null && <span className="text-sm text-txt-primary">{label}</span>}
    </label>
  );
}
export default Checkbox;

