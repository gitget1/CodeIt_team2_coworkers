import { cn } from '@/shared/lib/cn';

export interface SidebarFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarFooter({ children, className }: SidebarFooterProps) {
  return (
    <div className={cn('p-3 bg-background-primary/50', className)}>
      {children}
    </div>
  );
}
