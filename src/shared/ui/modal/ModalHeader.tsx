import { cn } from '@/shared/lib/cn';

export function ModalHeader({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col items-center gap-2 px-8 pt-10 pb-0', className)} {...props}>
      {children}
    </div>
  );
}
