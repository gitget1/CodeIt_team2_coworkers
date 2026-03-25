import { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/cn';

export type IconProgressProps = {
  size?: number;
  className?: string;
  /** 0~1 진행 비율 */
  progress?: number;
  /**
   * 값 변화(예: 4/5 -> 5/5) 때 부드러운 등장 애니메이션을 원하면 true로 사용하세요.
   * - 정적 렌더링에는 기본값 false
   */
  animateOnMount?: boolean;
};

export function IconProgress({
  size = 20,
  className,
  progress = 0,
  animateOnMount = false,
}: IconProgressProps) {
  const [show, setShow] = useState(!animateOnMount);

  useEffect(() => {
    if (!animateOnMount) return;
    setShow(false);
    const t = window.setTimeout(() => setShow(true), 10);
    return () => window.clearTimeout(t);
  }, [animateOnMount]);

  const clampedProgress = Math.min(1, Math.max(0, progress));
  const r = 6.25;
  const circumference = 2 * Math.PI * r;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={cn(
        'shrink-0',
        'transition-all duration-200 ease-out',
        animateOnMount && !show && 'opacity-0 translate-y-1',
        animateOnMount && show && 'opacity-100 translate-y-0',
        className,
      )}
    >
      {/* 배경 원(회색) */}
      <circle cx="10" cy="10" r={r} stroke="#F8FAFC" strokeWidth="2.641" fill="none" />
      {/* 진행 원(파란색) */}
      <circle
        cx="10"
        cy="10"
        r={r}
        stroke="#74A1FB"
        strokeWidth="2.641"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - clampedProgress)}
        transform="rotate(-90 10 10)"
        style={{ transition: 'stroke-dashoffset 300ms ease-out' }}
      />
    </svg>
  );
}

