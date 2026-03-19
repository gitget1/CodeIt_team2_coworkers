import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';
import Image from 'next/image';
import LandingHeaderDesktop from '@/shared/assets/images/landing-header-desktop.png';
import LandingHeaderTablet from '@/shared/assets/images/landing-header-tablet.png';
import LandingHeaderMobile from '@/shared/assets/images/landing-header-mobile.png';
import LandingHeaderIcon from '@/shared/assets/images/landing-header.png';

interface LandingHeroProps {
  onStart: () => void;
  className?: string;
}

export const LandingHero = ({ onStart, className }: LandingHeroProps) => {
  return (
    <section className={cn('bg-background-secondary w-full overflow-hidden', className)}>
      <div className="flex w-full flex-col pt-20 lg:flex-row lg:items-center lg:justify-between lg:pt-0">
        <div className="relative z-10 ml-10 flex w-full flex-col items-start text-left md:px-10 lg:ml-26 lg:w-90 lg:gap-80 lg:px-0 xl:w-100">
          <div className="relative flex flex-col items-start">
            <div className="absolute -top-9 -left-4 h-9 w-9 md:-top-10 md:-left-5 lg:-top-13 lg:-left-6 lg:h-12 lg:w-12">
              <Image
                src={LandingHeaderIcon}
                alt="Coworkers 아이콘"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-md relative mb-1 font-medium text-slate-400 md:text-base lg:text-xl">
              함께 완성해 가는 워크스페이스
            </span>
            <h1 className="text-brand-primary relative mb-8 text-[28px] font-bold md:text-[36px] lg:mb-28 lg:text-5xl">
              Coworkers
            </h1>
          </div>

          <div className="mb-1 shrink-0 lg:mb-0">
            <Button variant="primary" size="lg" onClick={onStart}>
              지금 시작하기
            </Button>
          </div>
        </div>

        <div className="relative flex w-full flex-1 justify-center lg:justify-end">
          <Image
            src={LandingHeaderMobile}
            alt="Coworkers 메인 대시보드 모바일"
            width={1280}
            height={1040}
            className="block h-auto w-full md:hidden"
            priority
          />
          <Image
            src={LandingHeaderTablet}
            alt="Coworkers 메인 대시보드 태블릿"
            width={2000}
            height={1624}
            className="hidden h-auto w-full md:block lg:hidden"
            priority
          />
          <Image
            src={LandingHeaderDesktop}
            alt="Coworkers 메인 대시보드 데스크톱"
            width={1330}
            height={1080}
            className="hidden h-auto w-full max-w-[1330] lg:block"
            priority
          />
        </div>
      </div>
    </section>
  );
};
