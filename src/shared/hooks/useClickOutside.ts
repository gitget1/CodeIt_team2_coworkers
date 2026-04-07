import { RefObject, useEffect } from 'react';

interface UseClickOutsideParams {
  refs: RefObject<HTMLElement | null>[];
  enabled?: boolean;
  onClickOutside: () => void;
}

export default function useClickOutside({
  refs,
  enabled = true,
  onClickOutside,
}: UseClickOutsideParams) {
  useEffect(() => {
    if (!enabled) return;

    /** 터치·펜·마우스 공통. 캡처 단계에서 잡아 모바일/태블릿에서도 바깥 탭 시 안정적으로 닫힘 */
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      const isInsideSomeRef = refs.some((ref) => ref.current?.contains(target));
      if (!isInsideSomeRef) {
        onClickOutside();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
    };
  }, [refs, enabled, onClickOutside]);
}
