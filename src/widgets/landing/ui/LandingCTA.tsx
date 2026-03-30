import { cn } from '@/shared/lib/cn';
import { CTAButton } from './CTAButton';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../constants/animation';

interface LandingCTAProps {
  className?: string;
}

export const LandingCTA = ({ className }: LandingCTAProps) => {
  return (
    <section className={cn('w-full bg-white', className)}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-brand-primary text-2lg mb-2 font-bold md:mb-3 md:text-2xl"
        >
          지금 바로 시작해보세요
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-txt-default mb-7 text-xs md:text-lg">
          팀원 모두와 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법
        </motion.p>
        <motion.div variants={fadeInUp}>
          <CTAButton />
        </motion.div>
      </motion.div>
    </section>
  );
};
