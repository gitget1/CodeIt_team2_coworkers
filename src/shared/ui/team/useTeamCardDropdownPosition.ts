import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import type { DropdownMenuAlign } from '@/shared/ui/dropdown';

const GAP_PX = 4;

export function useTeamCardDropdownPosition(
  isOpen: boolean,
  triggerRef: React.RefObject<HTMLButtonElement | null>,
  menuRef: React.RefObject<HTMLDivElement | null>,
  align: DropdownMenuAlign = 'left',
) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const updatePosition = useCallback(() => {
    const triggerEl = triggerRef.current;
    const menuEl = menuRef.current;
    if (!triggerEl || !menuEl) return;

    const r = triggerEl.getBoundingClientRect();

    menuEl.style.position = 'fixed';
    menuEl.style.top = `${r.bottom + GAP_PX}px`;
    if (align === 'right') {
      menuEl.style.right = `${window.innerWidth - r.right}px`;
      menuEl.style.left = 'auto';
    } else {
      menuEl.style.left = `${r.left}px`;
      menuEl.style.right = 'auto';
    }
  }, [align, menuRef, triggerRef]);

  // SSR에서는 useLayoutEffect 경고가 날 수 있어서, window 존재 시에만 layout 효과를 사용합니다.
  const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsoLayoutEffect(() => {
    if (!isOpen) return;

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  return { mounted };
}
