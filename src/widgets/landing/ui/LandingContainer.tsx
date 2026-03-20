import { StaticImageData } from 'next/image';
import Feature1Desktop from '@/shared/assets/images/landing-feature1-desktop.png';
import Feature2Desktop from '@/shared/assets/images/landing-feature2-desktop.png';
import Feature3Desktop from '@/shared/assets/images/landing-feature3-desktop.png';
import Feature1Tablet from '@/shared/assets/images/landing-feature1-tablet.png';
import Feature2Tablet from '@/shared/assets/images/landing-feature2-tablet.png';
import Feature3Tablet from '@/shared/assets/images/landing-feature3-tablet.png';
import Feature1Mobile from '@/shared/assets/images/landing-feature1-mobile.png';
import Feature2Mobile from '@/shared/assets/images/landing-feature2-mobile.png';
import Feature3Mobile from '@/shared/assets/images/landing-feature3-mobile.png';
import Feature1Icon from '@/shared/assets/images/landing-feature1.png';
import Feature2Icon from '@/shared/assets/images/landing-feature2.png';
import Feature3Icon from '@/shared/assets/images/landing-feature3.png';
import { LandingHero } from './LandingHero';
import { LandingFeatureSection } from './LandingFeatureSection';
import { LandingCTA } from './LandingCTA';

export type FeatureTheme = 'light' | 'primary';
export type ImagePosition = 'left' | 'right';

export interface LandingFeature {
  id: string;
  titleLines: string[];
  descriptionLines: string[];
  icon: StaticImageData | string;
  images: {
    desktop: StaticImageData | string;
    tablet: StaticImageData | string;
    mobile: StaticImageData | string;
  };
  theme: FeatureTheme;
  imagePosition: ImagePosition;
  isLargeIcon?: boolean;
  imageAlignBottom?: boolean;
}

export const LANDING_FEATURES: LandingFeature[] = [
  {
    id: 'kanban',
    titleLines: ['칸반보드로 함께', '할 일 목록을 관리해요'],
    descriptionLines: [
      '팀원과 함께 실시간으로 할 일을 추가하고',
      '지금 무엇을 해야 하는지 한눈에 볼 수 있어요',
    ],
    icon: Feature1Icon,
    images: {
      desktop: Feature1Desktop,
      tablet: Feature1Tablet,
      mobile: Feature1Mobile,
    },
    theme: 'light',
    imagePosition: 'right',
    isLargeIcon: true,
  },
  {
    id: 'task',
    titleLines: ['세부적으로 할 일들을', '간편하게 체크해요'],
    descriptionLines: ['일정에 맞춰 해야 할 세부 항목을 정리하고,', '하나씩 빠르게 완료해보세요'],
    icon: Feature2Icon,
    images: {
      desktop: Feature2Desktop,
      tablet: Feature2Tablet,
      mobile: Feature2Mobile,
    },
    theme: 'primary',
    imagePosition: 'left',
    imageAlignBottom: true,
  },
  {
    id: 'taskDetail',
    titleLines: ['할 일 공유를 넘어', '의견을 나누고 함께 결정해요'],
    descriptionLines: [
      '댓글로 진행상황을 기록하고 피드백을 주고받으며',
      '함께 결정을 내릴 수 있어요',
    ],
    icon: Feature3Icon,
    images: {
      desktop: Feature3Desktop,
      tablet: Feature3Tablet,
      mobile: Feature3Mobile,
    },
    theme: 'light',
    imagePosition: 'right',
    imageAlignBottom: true,
  },
];

export const LandingContainer = () => {
  return (
    <div className="flex w-full flex-col">
      <LandingHero />
      {LANDING_FEATURES.map((feature) => (
        <LandingFeatureSection key={feature.id} feature={feature} />
      ))}
      <LandingCTA />
    </div>
  );
};
