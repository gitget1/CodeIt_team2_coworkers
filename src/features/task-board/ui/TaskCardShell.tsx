import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

type TaskCardShellProps = {
  collapsed: boolean;
  children: ReactNode;
};

export function TaskCardShell({ collapsed, children }: TaskCardShellProps) {
  return (
    <div
      className={cn(
        'w-[270px] rounded-[12px] border border-background-tertiary bg-background-primary flex flex-col',
        'max-[767px]:w-[343px] min-[768px]:w-[620px] lg:w-[270px]',
        collapsed
          ? 'h-[54px] gap-0 pl-[20px] pr-[12px] pt-[16px] pb-0'
          : 'min-h-[151px] gap-[10px] pl-[20px] pr-[16px] pt-[16px] pb-[24px]',
      )}
    >
      {children}
    </div>
  );
}
