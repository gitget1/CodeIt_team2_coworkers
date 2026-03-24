import { useEffect, useState } from 'react';

const DEFAULT_TABLET_MAX_WIDTH = 1024;

export function useIsMobileOrTablet(tabletMaxWidth = DEFAULT_TABLET_MAX_WIDTH) {
  // SSR/CSR 초기 렌더를 동일하게 맞춰 hydration mismatch를 방지합니다.
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const update = () => setIsMobileOrTablet(window.innerWidth < tabletMaxWidth);
    update();

    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [tabletMaxWidth]);

  return isMobileOrTablet;
}
