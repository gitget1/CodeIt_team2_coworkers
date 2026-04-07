export type CheckboxIconSize = 'sm' | 'lg';

export const CHECKBOX_ICON_SIZE_PX: Record<CheckboxIconSize, number> = {
  sm: 12,
  lg: 16,
};

type Props = {
  checked: boolean;
  size: CheckboxIconSize;
};

/**
 * Checkbox 전용 아이콘 (inline svg)
 * - `<img src={svg}>` 대신 inline으로 렌더해 디코딩/로딩 비용을 줄입니다.
 * - 색상은 globals.css 의 디자인 토큰(brand-primary, icon-inverse, icon-primary)을 사용합니다.
 */
export function CheckboxIcon({ checked, size }: Props) {
  const iconSizePx = CHECKBOX_ICON_SIZE_PX[size];

  if (checked) {
    return (
      <svg
        width={iconSizePx}
        height={iconSizePx}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        className="block"
      >
        <rect width="16" height="16" rx="6" fill="var(--color-brand-primary)" />
        <path
          d="M4 8L7 11L12 6"
          stroke="var(--color-icon-inverse)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width={iconSizePx}
      height={iconSizePx}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className="block"
    >
      <rect
        x="0.5"
        y="0.5"
        width="15"
        height="15"
        rx="5.5"
        stroke="var(--color-icon-primary)"
      />
    </svg>
  );
}

