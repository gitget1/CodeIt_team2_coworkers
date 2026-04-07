import { clamp } from '@/shared/lib/clamp';

/** TeamCard에서 표시/렌더링하는 진행률을 UI 제약(0~100)으로 보정합니다. */
export function getSafeProgressPercent(value: number) {
  return Math.round(clamp(value, 0, 100));
}
