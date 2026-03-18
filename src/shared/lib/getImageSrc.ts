/** Next/Webpack에서 이미지/아이콘 import 시 반환 가능한 타입 */
type ImageAsset = string | { src?: string };

function isImageObject(asset: ImageAsset): asset is { src?: string } {
  return typeof asset === 'object' && asset !== null && 'src' in asset;
}

/**
 * import된 이미지 에셋에서 실제 URL 문자열을 반환합니다.
 * 타입 가드를 사용해 `as` 단언 없이 안전하게 추출합니다.
 */
export function getImageSrc(asset: ImageAsset): string {
  if (typeof asset === 'string') return asset;
  if (isImageObject(asset)) return asset.src ?? '';
  return '';
}
