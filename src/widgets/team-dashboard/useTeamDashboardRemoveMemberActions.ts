import { useState } from 'react';
import type { MemberCardItem } from '@/shared/ui/profile';
import { toast } from 'sonner';
import { useRemoveGroupMemberMutation } from '@/features/group/hooks/useRemoveMemberMutation';
import { useModal } from '@/shared/ui/modal';

type Params = {
  groupId: number;
};

export function useTeamDashboardRemoveMemberActions({ groupId }: Params) {
  const {
    isOpen: isRemoveMemberModalOpen,
    open: openRemoveMemberModal,
    close: closeRemoveMemberModal,
  } = useModal(false);

  const [isRemovingMember, setIsRemovingMember] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<MemberCardItem | null>(null);

  const { mutateAsync: removeGroupMember } = useRemoveGroupMemberMutation();

  const handleRemoveMemberRequest = (member: MemberCardItem) => {
    setMemberToRemove(member);
    openRemoveMemberModal();
  };

  const handleConfirmRemoveMember = async () => {
    if (!memberToRemove) return;

    const memberUserId = Number.parseInt(memberToRemove.id, 10);
    if (!Number.isFinite(memberUserId)) {
      toast.error('탈퇴시킬 멤버 정보가 올바르지 않습니다.');
      return;
    }

    setIsRemovingMember(true);
    try {
      await removeGroupMember({ groupId, memberUserId });
      toast.success(`${memberToRemove.name}님을 팀에서 제외했습니다.`);
      setMemberToRemove(null);
      closeRemoveMemberModal();
    } catch {
      toast.error('멤버 제거에 실패했습니다.');
    } finally {
      setIsRemovingMember(false);
    }
  };

  return {
    isRemoveMemberModalOpen,
    openRemoveMemberModal,
    closeRemoveMemberModal,
    isRemovingMember,
    memberToRemove,
    handleRemoveMemberRequest,
    handleConfirmRemoveMember,
  };
}

