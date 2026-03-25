import { useRouter } from 'next/router';
import { ResetPasswordRequest } from '../model/dto/auth.dto';
import { useForm } from 'react-hook-form';
import { useResetPasswordMutation } from './useResetPasswordMutation';
import { toast } from 'sonner';

type ResetPasswordFormValues = Omit<ResetPasswordRequest, 'token'>;

export function useResetPasswordForm(token: string) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({ mode: 'onSubmit' });

  const { mutate: resetPassword, isPending } = useResetPasswordMutation();

  const submitHandler = (data: ResetPasswordFormValues) => {
    resetPassword(
      {
        token,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      },
      {
        onSuccess: () => {
          toast.success('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.');
          router.replace('/login');
        },
      },
    );
  };

  return {
    register,
    onSubmit: handleSubmit(submitHandler),
    errors,
    isSubmitting: isPending,
  };
}
