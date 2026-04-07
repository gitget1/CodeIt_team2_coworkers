import { useCallback, useState } from 'react';
import { useModal } from '@/shared/ui/modal';
import type { MemberCardItem, MemberCardModalMode } from './memberCard.types';

export type UseMemberCardModalStateOptions = {
  /** 모달 닫을 때 기본 모드로 되돌릴 값 */
  defaultModeOnClose?: MemberCardModalMode;
};

export function useMemberCardModalState({
  defaultModeOnClose = 'member',
}: UseMemberCardModalStateOptions = {}) {
  const [selectedMember, setSelectedMember] = useState<MemberCardItem | null>(null);
  const [modalMode, setModalMode] = useState<MemberCardModalMode>(defaultModeOnClose);
  /** 「전체 멤버」에서 상세로 들어간 경우에만 뒤로가기 버튼을 보여줍니다. */
  const [memberDetailFromAllList, setMemberDetailFromAllList] = useState(false);

  const { isOpen, open, close } = useModal(false);

  const handleMemberClick = useCallback(
    (member: MemberCardItem) => {
      setMemberDetailFromAllList(false);
      setSelectedMember(member);
      setModalMode('member');
      open();
    },
    [open],
  );

  const handleMemberClickInList = useCallback((member: MemberCardItem) => {
    setMemberDetailFromAllList(true);
    setSelectedMember(member);
    setModalMode('member');
  }, []);

  const handleBackToList = useCallback(() => {
    setMemberDetailFromAllList(false);
    setSelectedMember(null);
    setModalMode('all');
  }, []);

  const handleMoreClick = useCallback(() => {
    setMemberDetailFromAllList(false);
    setSelectedMember(null);
    setModalMode('all');
    open();
  }, [open]);

  const handleModalClose = useCallback(() => {
    close();
    setSelectedMember(null);
    setModalMode(defaultModeOnClose);
    setMemberDetailFromAllList(false);
  }, [close, defaultModeOnClose]);

  return {
    isOpen,
    open,
    modalMode,
    selectedMember,
    memberDetailFromAllList,
    onMemberClick: handleMemberClick,
    onMemberClickInList: handleMemberClickInList,
    onBackToList: handleBackToList,
    onMoreClick: handleMoreClick,
    onModalClose: handleModalClose,
  };
}

