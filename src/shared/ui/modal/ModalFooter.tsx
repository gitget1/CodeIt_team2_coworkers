import { cn } from '@/shared/lib/cn';

export function ModalFooter({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex w-full items-center gap-2 px-8 pt-4 pb-8', className)} {...props}>
      {children}
    </div>
  );
}
