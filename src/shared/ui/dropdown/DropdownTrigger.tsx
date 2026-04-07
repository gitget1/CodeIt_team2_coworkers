import { useDropdownTrigger } from '@/shared/hooks/useDropdownTrigger';
import { IconArrowDown } from '@/shared/ui/icons';
import { cn } from '@/shared/lib/cn';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  /** true이면 트리거 오른쪽에 IconArrowDown(공용 아이콘 컴포넌트)을 표시합니다. */
  showChevron?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPointerDown?: (e: React.PointerEvent<HTMLButtonElement>) => void;
}

export default function DropdownTrigger({ children, className, showChevron, onClick, onPointerDown }: Props) {
  const { triggerProps } = useDropdownTrigger();
  const { onClick: triggerOnClick, ...restTriggerProps } = triggerProps;

  return (
    <button
      {...restTriggerProps}
      className={cn('inline-flex cursor-pointer items-center gap-1', className)}
      onPointerDown={onPointerDown}
      onClick={(e) => {
        onClick?.(e);
        triggerOnClick?.();
      }}
    >
      {children}
      {showChevron && <IconArrowDown size={16} aria-hidden />}
    </button>
  );
}
