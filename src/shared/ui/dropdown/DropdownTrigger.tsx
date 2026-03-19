import { useDropdownTrigger } from '@/shared/hooks/useDropdownTrigger';
import { IconArrowDown } from '@/shared/ui/icons';
import { cn } from '@/shared/lib/cn';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  /** true이면 트리거 오른쪽에 IconArrowDown(공용 아이콘 컴포넌트)을 표시합니다. */
  showChevron?: boolean;
}

export default function DropdownTrigger({ children, className, showChevron }: Props) {
  const { triggerProps } = useDropdownTrigger();

  return (
    <button
      {...triggerProps}
      className={cn('inline-flex cursor-pointer items-center gap-1', className)}
    >
      {children}
      {showChevron && <IconArrowDown size={16} aria-hidden />}
    </button>
  );
}
