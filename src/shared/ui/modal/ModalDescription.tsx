import { cn } from '@/shared/lib/cn';
import { useModalContext, useModalPartPresence } from './Modal';

export function ModalDescription({ children, className, ...props }: React.ComponentProps<'p'>) {
  const { descriptionId, registerDescription, deregisterDescription } = useModalContext();

  useModalPartPresence(registerDescription, deregisterDescription);

  return (
    <p
      id={descriptionId}
      className={cn('text-md text-txt-secondary font-medium', className)}
      {...props}
    >
      {children}
    </p>
  );
}
