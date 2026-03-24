import { useRouter } from 'next/router';
import { SignUpRequest } from '../model/dto/auth.dto';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import axios from 'axios';
import { useSignUp } from './useSignUp';
import { useCallback, useEffect } from 'react';

const SIGNUP_FIELDS: Array<keyof SignUpRequest> = [
  'email',
  'nickname',
  'password',
  'passwordConfirmation',
];

export function useSignUpForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    formState: { errors },
  } = useForm<SignUpRequest>({ mode: 'onSubmit' });

  const { mutate: signUp, isPending } = useSignUp();

  const currentPassword = watch('password');

  useEffect(() => {
    if (errors.passwordConfirmation) {
      trigger('passwordConfirmation');
    }
  }, [currentPassword]);

  const validatePasswordMatch = useCallback(
    (value: string) => {
      return value === currentPassword || '비밀번호가 일치하지 않습니다.';
    },
    [currentPassword],
  );

  const submitHandler = (data: SignUpRequest) => {
    signUp(data, {
      onSuccess: (user) => {
        toast.success(`${user.name}님 환영합니다!`);
        router.push('/');
      },
      onError: (error: unknown) => {
        if (axios.isAxiosError(error) && error.response) {
          const { message, details } = error.response.data;
          toast.error(message || '회원가입에 실패했습니다.');
          if (details) {
            (Object.keys(details) as Array<keyof SignUpRequest>).forEach((field) => {
              setError(field, { type: 'server', message: '' });
            });
          } else {
            SIGNUP_FIELDS.forEach((field) => {
              setError(field, { type: 'server', message: '' });
            });
          }
        } else {
          toast.error('회원가입 중 알 수 없는 오류가 발생했습니다.');
        }
      },
    });
  };

  return {
    register,
    onSubmit: handleSubmit(submitHandler),
    errors,
    isSubmitting: isPending,
    validatePasswordMatch,
  };
}
