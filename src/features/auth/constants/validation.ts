export const AUTH_VALIDATION_RULES = {
  email: {
    required: '이메일은 필수 입력입니다.',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: '이메일 형식으로 작성해 주세요.',
    },
  },
  password: {
    required: '비밀번호는 필수 입력입니다.',
    minLength: {
      value: 8,
      message: '비밀번호는 최소 8자 이상이어야 합니다.',
    },
    pattern: {
      value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
      message: '비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.',
    },
  },
} as const;
