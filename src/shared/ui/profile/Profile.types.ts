import type { StaticImageData } from 'next/image';

export type ImageAsset = string | StaticImageData;

export type ProfileSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ProfileProps {
  /**
   * 표시 크기
   * - xs: 20px (모바일 밀집 UI 등)
   * - sm: 24px
   * - md: 32px
   * - lg: 40px
   */
  size?: ProfileSize;
  /** 프로필 이미지. 주어지면 이미지를 표시하고, 없으면 기본 사용자 아이콘을 표시합니다. */
  imageSrc?: ImageAsset;
  /** 이미지 접근성을 위한 대체 텍스트 */
  alt?: string;
  /**
   * 인접 텍스트에 이름 등이 이미 있을 때 true로 두면 아바타를 장식용으로 처리합니다.
   * (스크린 리더에서 이미지/아이콘과 텍스트가 중복으로 읽히지 않도록 합니다.)
   */
  decorative?: boolean;
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
