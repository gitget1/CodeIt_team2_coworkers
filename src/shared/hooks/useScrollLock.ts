import { useEffect } from 'react';


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
/**
 * body 스크롤을 잠그거나 해제합니다.
 * 모달/드로어 열림 시 배경 스크롤 방지에 사용합니다.
 *
 * 동작:
 * - locked === true 인 동안 document.body.style.overflow = 'hidden'으로 스크롤을 잠급니다.
 * - locked가 false로 바뀌거나 컴포넌트가 언마운트될 때, 잠금 직전의 overflow 값을 복원합니다.
 *
 * 변경 이력·기존 사용처 호환:
 * - 시그니처(useScrollLock(locked: boolean))와 동작은 기존과 동일합니다.
 * - 주석만 추가·정리한 변경이므로, 이미 이 훅을 사용 중인 곳에서는 동작 변경이나 버그가 발생하지 않습니다.
 *
 * 주의:
 * - 여러 컴포넌트에서 동시에 이 훅을 사용하면(중첩 잠금) 복원 순서에 따라 overflow가 예상과 다르게
 *   되돌아갈 수 있습니다. 동일 페이지에서 중복 사용은 피하는 것을 권장합니다.
 * - SSR 환경에서는 document가 없으므로 early return으로 안전하게 no-op 처리합니다.
 */