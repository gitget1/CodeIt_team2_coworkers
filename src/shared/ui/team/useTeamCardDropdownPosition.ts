'use client';

import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

const GAP_PX = 4;

export type TeamCardMenuAlign = 'left' | 'right';

export function useTeamCardDropdownPosition(
  isOpen: boolean,
  triggerRef: React.RefObject<HTMLButtonElement | null>,
  align: TeamCardMenuAlign = 'left',
) {
  const [mounted, setMounted] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => setMounted(true), []);

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const base: React.CSSProperties = { position: 'fixed', top: r.bottom + GAP_PX };

    if (align === 'right') {
      setStyle({ ...base, right: window.innerWidth - r.right, left: 'auto' });
    } else {
      setStyle({ ...base, left: r.left, right: 'auto' });
    }
  }, [align, triggerRef]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  return { mounted, style };
}
