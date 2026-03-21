import { useForm } from 'react-hook-form';
import { SignInRequest } from '../model/dto/auth.dto';
import { useSignIn } from './useSignIn';
import { toast } from 'sonner';
import { useRouter } from 'next/router';

export function useAuthForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInRequest>({
    mode: 'onSubmit',
  });

  const { mutate: signIn, isPending } = useSignIn();

  const onSubmit = (data: SignInRequest) => {
    signIn(data, {
      onSuccess: (user) => {
        toast.success(`${user.name}님 환영합니다!`);
        router.push('/');
      },
      onError: () => {
        toast.error('이메일 혹은 비밀번호를 입력해주세요.');
        setError('email', { type: 'server', message: '' });
        setError('password', { type: 'server', message: '' });
      },
    });
  };

  return { register, handleSubmit, onSubmit, errors, isSubmitting: isPending };
}
