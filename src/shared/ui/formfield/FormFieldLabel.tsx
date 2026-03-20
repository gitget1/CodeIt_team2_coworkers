import { cn } from '@/shared/lib/cn';
import { useFormField } from './FormField';

interface FormFieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function FormFieldLabel({ className, children, ...props }: FormFieldLabelProps) {
  const { id } = useFormField();

  return (
    <label
      htmlFor={id}
      className={cn(
        'text-txt-primary flex items-center justify-between text-sm font-medium md:text-lg',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
    </label>
  );
}
