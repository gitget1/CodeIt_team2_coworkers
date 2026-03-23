import { useForm } from 'react-hook-form';
import { SignInRequest } from '../model/dto/auth.dto';
import { useSignIn } from './useSignIn';
import { toast } from 'sonner';
import { useRouter } from 'next/router';
import { USER_QUERY_KEYS } from '@/features/user/lib/queryKeys';
import { useQueryClient } from '@tanstack/react-query';

export function useAuthForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInRequest>({
    mode: 'onSubmit',
  });

  const { mutate: signIn, isPending } = useSignIn();

  const submitHandler = (data: SignInRequest) => {
    signIn(data, {
      onSuccess: (user) => {
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.me() });
        toast.success(`${user.name}님 환영합니다!`);
        const returnUrl = (router.query.redirect as string) || '/';
        router.push(returnUrl);
      },
      onError: () => {
        toast.error('이메일 혹은 비밀번호를 입력해주세요.');
        setError('email', { type: 'server', message: '' });
        setError('password', { type: 'server', message: '' });
      },
    });
  };

  return { register, onSubmit: handleSubmit(submitHandler), errors, isSubmitting: isPending };
}
