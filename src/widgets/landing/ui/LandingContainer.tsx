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

export interface LandingFeature {
  id: string;
  title: string;
  description: string;
  imageAlt: string;
  icon: StaticImageData | string;
  images: {
    desktop: StaticImageData | string;
    tablet: StaticImageData | string;
    mobile: StaticImageData | string;
  };
  theme: FeatureTheme;
  isLargeIcon?: boolean;
  imageAlignBottom?: boolean;
}

export const LANDING_FEATURES: LandingFeature[] = [
  {
    id: 'kanban',
    title: '칸반보드로 함께\n할 일 목록을 관리해요',
    description:
      '팀원과 함께 실시간으로 할 일을 추가하고\n지금 무엇을 해야 하는지 한눈에 볼 수 있어요',
    imageAlt: '칸반보드 기능',
    icon: Feature1Icon,
    images: {
      desktop: Feature1Desktop,
      tablet: Feature1Tablet,
      mobile: Feature1Mobile,
    },
    theme: 'light',
    isLargeIcon: true,
  },
  {
    id: 'task',
    title: '세부적으로 할 일들을\n간편하게 체크해요',
    description: '일정에 맞춰 해야 할 세부 항목을 정리하고\n하나씩 빠르게 완료해보세요',
    imageAlt: '할 일 체크리스트',
    icon: Feature2Icon,
    images: {
      desktop: Feature2Desktop,
      tablet: Feature2Tablet,
      mobile: Feature2Mobile,
    },
    theme: 'primary',
    imageAlignBottom: true,
  },
  {
    id: 'taskDetail',
    title: '할 일 공유를 넘어\n의견을 나누고 함께 결정해요',
    description: '댓글로 진행상황을 기록하고 피드백을 주고받으며\n함께 결정을 내릴 수 있어요',
    imageAlt: '할 일 상세 피드백',
    icon: Feature3Icon,
    images: {
      desktop: Feature3Desktop,
      tablet: Feature3Tablet,
      mobile: Feature3Mobile,
    },
    theme: 'light',
    imageAlignBottom: true,
  },
];

export const LandingContainer = () => {
  return (
    <main className="flex w-full flex-col">
      <LandingHero />
      {LANDING_FEATURES.map((feature) => (
        <LandingFeatureSection key={feature.id} feature={feature} />
      ))}
      <LandingCTA />
    </main>
  );
};
