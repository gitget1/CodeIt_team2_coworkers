import { Modal } from '@/shared/ui/modal';
import type { MemberCardItem, MemberCardModalMode } from './memberCard.types';
import { MemberCardModalMember } from './MemberCardModalMember';
import { MemberCardModalMembersList } from './MemberCardModalMembersList';

type Props = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  modalMode: MemberCardModalMode;
  selectedMember: MemberCardItem | null;
  members: MemberCardItem[];
};

export function MemberCardModal({ isOpen, open, close, modalMode, selectedMember, members }: Props) {
  return (
    <Modal isOpen={isOpen} open={open} close={close}>
      <Modal.Content size="sm" className="pb-4">
        <Modal.Header>
          <Modal.Title>{modalMode === 'all' ? '전체 멤버' : '멤버 정보'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMode === 'member' ? (
            <MemberCardModalMember member={selectedMember} />
          ) : (
            <MemberCardModalMembersList members={members} />
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

