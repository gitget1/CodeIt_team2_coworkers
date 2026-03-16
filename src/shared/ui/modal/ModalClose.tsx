import { cn } from '@/shared/lib/cn';
import { useModalContext } from './Modal';
import React from 'react';

interface ModalCloseProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
}

interface ChildProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export function ModalClose({
  onClick,
  children,
  className,
  asChild = false,
  ...props
}: ModalCloseProps) {
  const { close } = useModalContext();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick?.(e as React.MouseEvent<HTMLButtonElement>);

    if (!e.defaultPrevented) {
      close();
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
    });
  }
  return (
    <button type="button" className={cn(className)} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
