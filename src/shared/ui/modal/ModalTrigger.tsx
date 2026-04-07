import { cn } from '@/shared/lib/cn';
import React from 'react';
import { useModalContext } from './Modal';

interface ModalTriggerProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
}

interface ChildProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export function ModalTrigger({
  onClick,
  children,
  className,
  asChild = false,
  ...props
}: ModalTriggerProps) {
  const { open, isOpen } = useModalContext();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick?.(e as React.MouseEvent<HTMLButtonElement>);

    if (!e.defaultPrevented) {
      open?.();
    }
  };

  if (asChild && React.isValidElement<ChildProps>(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      className: cn(className, children.props.className),
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        children.props.onClick?.(e);
        if (!e.defaultPrevented) {
          handleClick(e);
        }
      },
      'aria-haspopup': 'dialog',
    });
  }

  return (
    <button
      type="button"
      className={cn(className)}
      onClick={handleClick}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      {...props}
    >
      {children}
    </button>
  );
}
