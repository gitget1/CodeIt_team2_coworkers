import { cn } from '@/shared/lib/cn';
import Image from 'next/image';
import LandingHeaderDesktop from '@/shared/assets/images/landing-header-desktop.png';
import LandingHeaderTablet from '@/shared/assets/images/landing-header-tablet.png';
import LandingHeaderMobile from '@/shared/assets/images/landing-header-mobile.png';
import LandingHeaderIcon from '@/shared/assets/images/landing-header.png';
import { CTAButton } from './CTAButton';
import { motion } from 'framer-motion';
import { fadeInUp, fadeLeft, staggerContainer } from '../constants/animation';

interface LandingHeroProps {
  className?: string;
}

export const LandingHero = ({ className }: LandingHeroProps) => {
  return (
    <section className={cn('bg-background-secondary w-full overflow-hidden', className)}>
      <div className="flex w-full flex-col pt-20 lg:flex-row lg:items-center lg:justify-between lg:pt-0">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 ml-10 flex w-full flex-col items-start text-left md:px-10 lg:ml-26 lg:w-90 lg:gap-80 lg:px-0 xl:w-100"
        >
          <div className="relative flex flex-col items-start">
            <motion.div
              variants={fadeInUp}
              className="absolute -top-9 -left-4 h-9 w-9 md:-top-10 md:-left-5 lg:-top-13 lg:-left-6 lg:h-12 lg:w-12"
            >
              <Image
                src={LandingHeaderIcon}
                alt="Coworkers 아이콘"
                fill
                className="object-contain"
              />
            </motion.div>
            <motion.span
              variants={fadeInUp}
              className="text-md relative mb-1 font-medium text-slate-400 md:text-base lg:text-xl"
            >
              함께 완성해 가는 워크스페이스
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-brand-primary relative mb-8 text-[28px] font-bold md:text-[36px] lg:mb-28 lg:text-5xl"
            >
              Coworkers
            </motion.h1>
          </div>

          <motion.div variants={fadeInUp} className="mb-1 shrink-0 lg:mb-0">
            <CTAButton />
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
          className="relative flex w-full flex-1 justify-center lg:justify-end"
        >
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
        </motion.div>
      </div>
    </section>
  );
};
