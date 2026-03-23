import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type ResetPasswordForm = {
  email: string;
};

export function useResetPasswordForm(closeModal: () => void) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordForm>({ mode: 'onSubmit' });

  const onSubmit = async (data: ResetPasswordForm) => {
    try {
      /**
       * TODO
       * password reset api 연결
       */
      toast.success('비밀번호 재설정 링크를 전송했습니다.');
      handleClose();
    } catch (error) {
      toast.error('이메일 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleClose = () => {
    reset();
    closeModal();
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    handleClose,
  };
}
