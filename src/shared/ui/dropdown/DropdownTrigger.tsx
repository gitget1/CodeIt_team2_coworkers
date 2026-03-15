import { useDropdownTrigger } from '@/shared/hooks/useDropdownTrigger';
import { cn } from '@/shared/lib/cn';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function DropdownTrigger({ children, className }: Props) {
  const { triggerProps } = useDropdownTrigger();

  return (
    <button {...triggerProps} className={cn('inline-block cursor-pointer', className)}>
      {children}
    </button>
  );
}
