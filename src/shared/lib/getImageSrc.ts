import type { StaticImageData } from 'next/image';

/** Next 이미지 import(StaticImageData) 또는 문자열 URL */
type ImageAsset = string | StaticImageData;

/**
 * import된 이미지 에셋에서 실제 URL 문자열을 반환합니다.
 * Next.js 내장 타입 StaticImageData를 사용해 타입 안정성을 높이고,
 * 불필요한 옵셔널 체이닝(asset.src ?? '') 없이 안전하게 추출합니다.
 */
export function getImageSrc(asset: ImageAsset): string {
  if (typeof asset === 'string') return asset;

  // StaticImageData의 `src`는 원칙적으로 문자열이지만,
  // 런타임 방어를 위해 명시적으로 처리합니다.
  return typeof asset.src === 'string' ? asset.src : '';
}
