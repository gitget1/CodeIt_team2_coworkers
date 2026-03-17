import React, { useState } from 'react';
import { IconEyeOpen, IconEyeClose } from '@/shared/ui/icons';
import { cn } from '@/shared/lib/cn';

/**
 * @description
 * 공통 Input 컴포넌트
 * 기본 입력창, 비밀번호 입력창(눈 아이콘 자동 생성), 커스텀 버튼 삽입 형태를 지원함.
 *`rightElement`를 주입할 경우 비밀번호 토글 버튼과 함께 나란히 렌더링 함.
 * - 에러 메시지 렌더링은 담당하지 않으며 `isInvalid`를 통해 테두리 상태만 제어 함.
 * @example
 * // 1. 기본 사용법
 * <Input placeholder="이메일을 입력해주세요" />
 *
 * // 2. 비밀번호 타입 (눈 아이콘 자동 생성)
 * <Input type="password" placeholder="비밀번호를 입력해주세요" />
 *
 * // 3. 유효성 검사 실패 (에러 상태 테두리)
 * <Input isInvalid={true} placeholder="다시 입력해주세요" />
 *
 * // 4. 오른쪽에 커스텀 요소(버튼) 넣기
 * <Input type="password" rightElement={<Button>변경하기</Button>} />
 */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  rightElement?: React.ReactNode;
}

export const Input = ({
  type = 'text',
  isInvalid = false,
  rightElement,
  className,
  ref,
  ...props
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const isPasswordInput = type === 'password';
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="relative flex w-full items-center">
      <input
        ref={ref}
        type={inputType}
        className={cn(
          'w-full border transition-colors outline-none',
          'bg-background-primary rounded-xl',
          'text-txt-primary placeholder:text-txt-default',
          //반응형 높이 (모바일: 44px, 태블릿 이상: 48px)
          'h-11 min-[744px]:h-12',
          'pl-4', // 왼쪽 패딩 고정
          isPasswordInput ? 'py-3' : 'py-[10.5px]', // 기준으로 패딩 고정
          rightElement && isPasswordInput
            ? 'pr-29'
            : rightElement || isPasswordInput
              ? 'pr-10'
              : 'pr-4',

          'border-background-tertiary hover:border-interaction-pressed focus:border-interaction-pressed',
          isInvalid && 'border-status-danger focus:border-status-danger',
          className,
        )}
        {...props}
      />
      <div className="absolute right-4 flex items-center gap-2">
        {isPasswordInput && (
          <button
            type="button"
            onClick={handleTogglePassword}
            aria-pressed={showPassword} // 토글 상태 명시
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
            className={cn(
              'text-icon-primary hover:text-interaction-pressed transition-colors focus:outline-none',
              'flex w-9.5 items-center justify-end',
              'via-background-primary to-background-primary bg-linear-to-r from-transparent via-45%',
            )}
          >
            {showPassword ? <IconEyeOpen size={24} /> : <IconEyeClose size={24} />}
          </button>
        )}
        {rightElement}
      </div>
    </div>
  );
};

Input.displayName = 'Input';
