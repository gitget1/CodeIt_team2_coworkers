import { useEffect, useState } from 'react';

const DEFAULT_TABLET_MAX_WIDTH = 1024;

function getInitialValue(maxWidth: number) {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < maxWidth;
}

export function useIsMobileOrTablet(tabletMaxWidth = DEFAULT_TABLET_MAX_WIDTH) {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(() =>
    getInitialValue(tabletMaxWidth),
  );

  useEffect(() => {
    const update = () => setIsMobileOrTablet(window.innerWidth < tabletMaxWidth);
    update();

    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [tabletMaxWidth]);

  return isMobileOrTablet;
}
