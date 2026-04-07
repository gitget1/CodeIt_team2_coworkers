import { Modal as ModalRoot, useModalContext } from './Modal';
import { ModalBody } from './ModalBody';
import { ModalClose } from './ModalClose';
import { ModalContent } from './ModalContent';
import { ModalDescription } from './ModalDescription';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';
import { ModalTitle } from './ModalTitle';
import { ModalTrigger } from './ModalTrigger';

export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
  Footer: ModalFooter,
  Close: ModalClose,
});

export { useModalContext };
export { useModal } from '@/shared/hooks/useModal';
