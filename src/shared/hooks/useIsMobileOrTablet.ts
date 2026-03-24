import { useEffect, useState } from 'react';

const DEFAULT_TABLET_MAX_WIDTH = 1024;
const RESIZE_THROTTLE_MS = 100;

export function useIsMobileOrTablet(tabletMaxWidth = DEFAULT_TABLET_MAX_WIDTH) {
  // SSR/CSR 초기 렌더를 동일하게 맞춰 hydration mismatch를 방지합니다.
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    let throttleTimer: ReturnType<typeof setTimeout> | null = null;

    const update = () => setIsMobileOrTablet(window.innerWidth < tabletMaxWidth);
    const onResize = () => {
      if (throttleTimer) return;
      throttleTimer = setTimeout(() => {
        update();
        throttleTimer = null;
      }, RESIZE_THROTTLE_MS);
    };

    update();

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [tabletMaxWidth]);

  return isMobileOrTablet;
}
