import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSendResetEmailMutation } from './useSendResetEmailMutation';

type SendResetEmailFormValue = {
  email: string;
};

export function useSendResetEmailForm(closeModal: () => void) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SendResetEmailFormValue>({ mode: 'onSubmit' });

  const { mutate: sendEmail, isPending } = useSendResetEmailMutation();

  const handleClose = () => {
    reset();
    closeModal();
  };

  const onSubmit = (data: SendResetEmailFormValue) => {
    const redirectUrl = `${window.location.origin}/reset-password`;

    sendEmail(
      { email: data.email, redirectUrl },
      {
        onSuccess: () => {
          toast.success('비밀번호 재설정 링크를 전송했습니다. 이메일을 확인해주세요.');
          handleClose();
        },
      },
    );
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isPending,
    handleClose,
  };
}
