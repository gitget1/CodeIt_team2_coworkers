import { cn } from '@/shared/lib/cn';
import { useModalContext, useModalPartPresence } from './Modal';

export function ModalTitle({ children, className, ...props }: React.ComponentProps<'h2'>) {
  const { titleId, setTitleRendered } = useModalContext();

  useModalPartPresence(setTitleRendered);

  return (
    <h2 id={titleId} className={cn('text-txt-primary text-lg font-medium', className)} {...props}>
      {children}
    </h2>
  );
}
