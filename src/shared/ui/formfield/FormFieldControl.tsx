import React from 'react';
import { useFormField } from './FormField';

interface ControlProps {
  id?: string;
  isInvalid?: boolean;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
}

interface FormFieldControlProps {
  children: React.ReactElement<ControlProps>;
}

export function FormFieldControl({ children }: FormFieldControlProps) {
  const { id, isInvalid } = useFormField();
  const errorId = `${id}-error`;

  if (!React.isValidElement(children)) {
    return <>{children}</>;
  }

  return React.cloneElement(children, {
    id,
    isInvalid,
    'aria-invalid': isInvalid,
    'aria-describedby': isInvalid ? errorId : undefined,
  });
}
