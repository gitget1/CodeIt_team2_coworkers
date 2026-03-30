import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconClose } from '../icons';
import useClickOutside from '@/shared/hooks/useClickOutside';
import { cn } from '@/shared/lib/cn';
import { useScrollLock } from '@/shared/hooks/useScrollLock';
import { useFocusTrap } from '@/shared/hooks/useFocusTrap';
import { useEscapeKey } from '@/shared/hooks/useEscapeKey';
import { useModalContext } from './Modal';

const MODAL_SIZES = {
  sm: 'sm:w-[375px]',
  md: 'sm:w-[384px]',
} as const;

type ModalSize = keyof typeof MODAL_SIZES;

interface ModalContentProps extends React.ComponentProps<'div'> {
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  size?: ModalSize;
}

const modalStyles = {
  dimmed:
    'fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm p-0 sm:items-center sm:p-4',
  content:
    'relative w-full max-h-[90vh] bg-white rounded-t-[32px] rounded-b-none sm:rounded-[32px] shadow-lg flex flex-col gap-2 overflow-hidden',
  closeButton:
    'absolute top-3 right-4 z-[60] cursor-pointer p-1 text-icon-primary hover:text-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-md',
};

export function ModalContent({
  closeOnOutsideClick = true,
  showCloseButton = true,
  size = 'md',
  children,
  className,
  ...props
}: ModalContentProps) {
  const { isOpen, close, titleId, descriptionId, isTitleRendered, isDescriptionRendered } =
    useModalContext();

  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useClickOutside({
    refs: [modalRef],
    enabled: isOpen && closeOnOutsideClick,
    onClickOutside: close,
  });

  useScrollLock(isOpen);
  useFocusTrap(isOpen, modalRef);
  useEscapeKey(isOpen, close);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className={modalStyles.dimmed}>
      <div
        ref={modalRef}
        className={cn(modalStyles.content, MODAL_SIZES[size], className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={isTitleRendered ? titleId : undefined}
        aria-describedby={isDescriptionRendered ? descriptionId : undefined}
        {...props}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={close}
            className={modalStyles.closeButton}
            aria-label="닫기"
          >
            <IconClose size={24} />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
