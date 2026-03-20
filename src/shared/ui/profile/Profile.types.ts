import type { StaticImageData } from 'next/image';

export type ImageAsset = string | StaticImageData;

export type ProfileSize = 'sm' | 'md' | 'lg';

export interface ProfileProps {
  /**
   * 표시 크기
   * - sm: 24px
   * - md: 32px
   * - lg: 40px
   */
  size?: ProfileSize;
  /** 프로필 이미지. 주어지면 이미지를 표시하고, 없으면 기본 사용자 아이콘을 표시합니다. */
  imageSrc?: ImageAsset;
  /** 이미지 접근성을 위한 대체 텍스트 */
  alt?: string;
  /** 컨테이너 스타일 커스터마이징 */
  className?: string;
  /** 테두리 스타일 커스터마이징 */
  borderClassName?: string;
  /** 사용자 아이콘 스타일 커스터마이징 */
  iconClassName?: string;
  /** 이미지 스타일 커스터마이징 */
  imageClassName?: string;
  ariaLabel?: string;
  title?: string;
}
