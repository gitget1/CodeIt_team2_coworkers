import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';

interface LandingCTAProps {
  onStart: () => void;
  className?: string;
}

export const LandingCTA = ({ onStart, className }: LandingCTAProps) => {
  return (
    <section className={cn('w-full bg-white', className)}>
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <h2 className="text-brand-primary text-2lg mb-2 font-bold md:mb-3 md:text-2xl">
          지금 바로 시작해보세요
        </h2>
        <p className="text-txt-default mb-7 text-xs md:text-lg">
          팀원 모두와 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법
        </p>

        <Button variant="primary" size="lg" onClick={onStart}>
          지금 시작하기
        </Button>
      </div>
    </section>
  );
};
