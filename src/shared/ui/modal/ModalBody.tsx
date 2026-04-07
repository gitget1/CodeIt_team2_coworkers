import { cn } from '@/shared/lib/cn';

export function ModalBody({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex-1 overflow-y-auto px-8 py-2', className)} {...props}>
      {children}
    </div>
  );
}
