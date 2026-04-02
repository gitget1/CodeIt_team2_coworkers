import { useState } from 'react';
import type { MemberCardItem } from '@/shared/ui/profile';
import { toast } from 'sonner';
import { getInvitationToken } from '@/features/group/api/getInvitationToken';
import { useRemoveGroupMemberMutation } from '@/features/group/hooks/useRemoveMemberMutation';
import { useModal } from '@/shared/ui/modal';
import { useCopyToClipboard } from '@/shared/hooks/useCopyToClipboard';

type Params = {
  groupId: number;
};

export function useTeamDashboardMemberActions({ groupId }: Params) {
  const { isOpen: isInviteModalOpen, open: openInviteModal, close: closeInviteModal } = useModal(false);
  const { copyText } = useCopyToClipboard();
  const {
    isOpen: isRemoveMemberModalOpen,
    open: openRemoveMemberModal,
    close: closeRemoveMemberModal,
  } = useModal(false);
  const [isCopyingInviteLink, setIsCopyingInviteLink] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<MemberCardItem | null>(null);
  const { mutateAsync: removeGroupMember, isPending: isRemovingMember } = useRemoveGroupMemberMutation();

  const handleCopyInviteLink = async () => {
    setIsCopyingInviteLink(true);
    try {
      const token = await getInvitationToken({ groupId });
      const inviteUrl = `${window.location.origin}/accept-invitation?token=${encodeURIComponent(token)}`;
      const ok = await copyText(inviteUrl, {
        successMessage: '초대 링크가 복사되었습니다.',
        errorMessage: '초대 링크 복사에 실패했습니다.',
      });
      if (ok) closeInviteModal();
    } finally {
      setIsCopyingInviteLink(false);
    }
  };

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
    try {
      await removeGroupMember({ groupId, memberUserId });
      toast.success(`${memberToRemove.name}님을 팀에서 제외했습니다.`);
      setMemberToRemove(null);
      closeRemoveMemberModal();
    } catch {
      toast.error('멤버 제거에 실패했습니다.');
    }
  };

  return {
    isInviteModalOpen,
    openInviteModal,
    closeInviteModal,
    isRemoveMemberModalOpen,
    openRemoveMemberModal,
    closeRemoveMemberModal,
    isCopyingInviteLink,
    isRemovingMember,
    memberToRemove,
    handleCopyInviteLink,
    handleRemoveMemberRequest,
    handleConfirmRemoveMember,
  };
}
