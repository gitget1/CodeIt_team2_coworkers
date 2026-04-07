import { cn } from '@/shared/lib/cn';
import { createContext, useContext, useId } from 'react';

interface FormFieldContextValue {
  id: string;
  isInvalid: boolean;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export const useFormField = () => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error('FormField 서브 컴포넌트는 FormField 내에서 사용되어야 합니다.');
  }
  return context;
};

interface FormFieldRootProps extends React.HTMLAttributes<HTMLDivElement> {
  isInvalid?: boolean;
}

export function FormField({
  isInvalid = false,
  className,
  children,
  ...props
}: FormFieldRootProps) {
  const id = useId();

  return (
    <FormFieldContext.Provider value={{ id, isInvalid }}>
      <div className={cn('flex w-full flex-col gap-2 md:gap-3', className)} {...props}>
        {children}
      </div>
    </FormFieldContext.Provider>
  );
}
