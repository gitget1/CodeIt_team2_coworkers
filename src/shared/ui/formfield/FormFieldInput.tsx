import { Input, InputProps } from '../input/Input';
import { useFormField } from './FormField';

export function FormFieldInput({ className, ...props }: InputProps) {
  const { id, isInvalid } = useFormField();
  const errorId = `${id}-error`;

  return (
    <Input
      id={id}
      isInvalid={isInvalid}
      aria-invalid={isInvalid}
      aria-describedby={isInvalid ? errorId : undefined}
      className={className}
      {...props}
    />
  );
}
