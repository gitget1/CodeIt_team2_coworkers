import { Modal, useModal } from '@/shared/ui/modal';
import { FormField } from '@/shared/ui/formfield';
import { Input } from '@/shared/ui/input/Input';
import { Button } from '@/shared/ui/Button';

export function PasswordChangeModal() {
  const { isOpen, open, close } = useModal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 비밀번호 변경 로직 실행
  };

  return (
    <Modal isOpen={isOpen} open={open} close={close}>
      <Modal.Trigger asChild>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={open}
          className="w-18.5 font-['Pretendard'] text-[14px] font-semibold whitespace-nowrap"
        >
          변경하기
        </Button>
      </Modal.Trigger>

      <Modal.Content size="md" showCloseButton={false}>
        <form onSubmit={handleSubmit}>
          <Modal.Header className="pt-8 pb-4">
            <Modal.Title className="text-txt-primary w-full text-center text-lg font-bold">
              비밀번호 변경하기
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="flex flex-col gap-5 px-4 sm:px-6">
            <FormField>
              <FormField.Label className="text-sm font-semibold">새 비밀번호</FormField.Label>
              <FormField.Control>
                <Input type="password" placeholder="새 비밀번호를 입력해주세요." />
              </FormField.Control>
            </FormField>

            <FormField>
              <FormField.Label className="text-sm font-semibold">새 비밀번호 확인</FormField.Label>
              <FormField.Control>
                <Input type="password" placeholder="새 비밀번호를 다시 한 번 입력해주세요." />
              </FormField.Control>
            </FormField>
          </Modal.Body>

          <Modal.Footer className="flex w-full gap-2 px-4 pt-6 pb-8 sm:px-6">
            <Modal.Close asChild>
              <Button
                variant="outline"
                size="lg"
                className="text-txt-secondary flex-1"
                aria-label="비밀번호 변경 모달 닫기"
              >
                닫기
              </Button>
            </Modal.Close>

            <Button variant="primary" size="lg" className="flex-1">
              변경하기
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal>
  );
}
