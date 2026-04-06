import type { CSSProperties, HTMLAttributes } from 'react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/lib/cn';
import { useDropdown } from './Dropdown';

type MenuAlign = 'left' | 'right';
export type DropdownMenuAlign = MenuAlign;

const alignStyles: Record<MenuAlign, string> = {
  left: 'left-0',
  right: 'right-0',
};

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'align'> {
  children: React.ReactNode;
  className?: string;
  align?: MenuAlign;
}

const MENU_GAP_PX = 8;

export default function DropdownMenu({ children, className, align = 'right', ...props }: Props) {
  const { isOpen, menuRef, menuId, triggerRef, useFixedMenu } = useDropdown();
  const [mounted, setMounted] = useState(false);
  const [fixedStyle, setFixedStyle] = useState<CSSProperties>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateFixedPosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const r = trigger.getBoundingClientRect();
    if (align === 'right') {
      setFixedStyle({
        position: 'fixed',
        top: r.bottom + MENU_GAP_PX,
        left: r.right,
        transform: 'translateX(-100%)',
        zIndex: 100,
      });
    } else {
      setFixedStyle({
        position: 'fixed',
        top: r.bottom + MENU_GAP_PX,
        left: r.left,
        zIndex: 100,
      });
    }
  }, [align, triggerRef]);

  const rafScrollRef = useRef<number | null>(null);
  const schedulePositionUpdate = useCallback(() => {
    if (rafScrollRef.current != null) return;
    rafScrollRef.current = requestAnimationFrame(() => {
      rafScrollRef.current = null;
      updateFixedPosition();
    });
  }, [updateFixedPosition]);

  const scrollListenerOptions = { capture: true, passive: true } as const;

  useLayoutEffect(() => {
    if (!isOpen || !useFixedMenu) return;
    updateFixedPosition();
    window.addEventListener('scroll', schedulePositionUpdate, scrollListenerOptions);
    window.addEventListener('resize', schedulePositionUpdate);
    return () => {
      if (rafScrollRef.current != null) {
        cancelAnimationFrame(rafScrollRef.current);
        rafScrollRef.current = null;
      }
      window.removeEventListener('scroll', schedulePositionUpdate, scrollListenerOptions);
      window.removeEventListener('resize', schedulePositionUpdate);
    };
  }, [isOpen, useFixedMenu, schedulePositionUpdate, updateFixedPosition]);

  if (!isOpen) return null;

  const baseClass = 'overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md';

  const menu = (
    <div
      id={menuId}
      ref={menuRef}
      className={cn(
        baseClass,
        !useFixedMenu && 'absolute mt-2',
        !useFixedMenu && alignStyles[align],
        className,
      )}
      style={useFixedMenu ? fixedStyle : undefined}
      {...props}
    >
      {children}
    </div>
  );

  if (useFixedMenu) {
    if (!mounted || typeof document === 'undefined') return null;
    return createPortal(menu, document.body);
  }

  return menu;
}
