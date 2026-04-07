import React from 'react';

export const ICON_SIZE = {
  sm: 16,
  md: 24, // 기본값
  lg: 32,
} as const;

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number;
}
