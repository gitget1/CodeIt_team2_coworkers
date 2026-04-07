import { cn } from '@/shared/lib/cn';

export interface SidebarContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarContent({ children, className }: SidebarContentProps) {
  return (
    <div className={cn('flex-1 overflow-y-auto overflow-x-hidden py-2', className)}>
      {children}
    </div>
  );
}
