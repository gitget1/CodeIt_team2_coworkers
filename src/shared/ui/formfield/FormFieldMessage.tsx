import { cn } from '@/shared/lib/cn';
import { useFormField } from './FormField';

interface FormFieldMessageProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function FormFieldMessage({ className, children, ...props }: FormFieldMessageProps) {
  const { id } = useFormField();
  const errorId = `${id}-error`;

  if (!children) return null;

  return (
    <span
      id={errorId}
      role="alert"
      className={cn('text-status-danger text-md pl-1 font-medium', className)}
      {...props}
    >
      {children}
    </span>
  );
}
