import { useEffect } from 'react';

/**
 * body 스크롤을 잠그거나 해제합니다.
 * 모달/드로어 열림 시 배경 스크롤 방지에 사용합니다.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked || typeof document === 'undefined') return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [locked]);
}
