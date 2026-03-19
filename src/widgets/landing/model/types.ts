import { StaticImageData } from 'next/image';

export type FeatureTheme = 'light' | 'primary';
export type ImagePosition = 'left' | 'right';

export interface LandingFeature {
  id: string;
  title: string;
  description: string;
  icon: StaticImageData | string;
  images: {
    desktop: StaticImageData | string;
    tablet: StaticImageData | string;
    mobile: StaticImageData | string;
  };
  theme: FeatureTheme;
  imagePosition: ImagePosition;
  isLargeIcon?: boolean;
  isMobileBottomAttached?: boolean;
}
