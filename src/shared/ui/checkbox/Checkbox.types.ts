import type React from 'react';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked' | 'onChange' | 'size'> {
  /**
   * controlled checked 상태
   * - 제공 시 이 값으로 렌더링되고, onChange는 상위에서 checked를 갱신해야 합니다.
   */
  checked?: boolean;
  /**
   * uncontrolled 초기값
   * - 미제공 시 기본값 false(미체크)로 시작합니다.
   */
  defaultChecked?: boolean;
  /**
   * 체크 상태 변경 시 호출됩니다.
   * - `checked`: 변경된 boolean 값
   * - `event`: 원본 change 이벤트 (form 라이브러리 연동·이벤트 정보 활용 시 사용)
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  /**
   * 체크박스 크기 (2단계)
   * - `sm`: 12px
   * - `lg`: 16px
   */
  size?: 'sm' | 'lg';
  className?: string;
}

