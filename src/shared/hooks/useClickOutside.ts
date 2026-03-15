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

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const isInsideSomeRef = refs.some((ref) => {
        return ref.current?.contains(target);
      });
      if (!isInsideSomeRef) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, enabled, onClickOutside]);
}
