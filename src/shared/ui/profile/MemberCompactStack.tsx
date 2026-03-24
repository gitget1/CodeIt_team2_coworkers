import { useCallback, useMemo } from 'react';
import { cn } from '@/shared/lib/cn';
import { useModal } from '@/shared/ui/modal';
import type { MemberCardItem } from './memberCard.types';
import { MemberCardModal } from './MemberCardModal';
import type { MemberCompactStackProps } from './memberCompactStack.types';
import {
  MEMBER_COMPACT_STACK_MAX_VISIBLE_AVATARS,
  MEMBER_COMPACT_STACK_SHELL,
  MEMBER_COMPACT_STACK_SHELL_SIZE,
} from './memberCompactStack.constants';
import { MemberCompactStackFace } from './MemberCompactStackFace';

function sortMembersAdminsFirst(list: MemberCardItem[]) {
  return [...list].sort((a, b) => {
    const aAdmin = a.isAdmin ? 1 : 0;
    const bAdmin = b.isAdmin ? 1 : 0;
    return bAdmin - aAdmin;
  });
}

export function MemberCompactStack({
  members,
  maxVisibleAvatars = MEMBER_COMPACT_STACK_MAX_VISIBLE_AVATARS,
  className,
  interactive = true,
  onOpen,
}: MemberCompactStackProps) {
  const { isOpen, open, close } = useModal(false);

  const sortedMembers = useMemo(() => sortMembersAdminsFirst(members), [members]);
  const totalCount = members.length;
  const clampedMaxVisibleAvatars = Math.max(
    1,
    Math.min(maxVisibleAvatars, MEMBER_COMPACT_STACK_MAX_VISIBLE_AVATARS),
  );
  const visible = sortedMembers.slice(0, clampedMaxVisibleAvatars);

  const handleOpen = useCallback(() => {
    onOpen?.();
    open();
  }, [onOpen, open]);

  const stack = (
    <div className="flex min-w-0 flex-1 items-center">
      <div className="flex items-center">
        {visible.map((m, i) => (
          <MemberCompactStackFace
            key={m.id}
            imageSrc={m.imageSrc}
            zIndex={visible.length - i}
            overlap={i > 0}
          />
        ))}
      </div>
    </div>
  );

  const count = (
    <span className="shrink-0 tabular-nums text-xs font-medium text-txt-default md:text-sm">
      {totalCount}
    </span>
  );

  const boxClass = cn(MEMBER_COMPACT_STACK_SHELL, MEMBER_COMPACT_STACK_SHELL_SIZE, className);

  const body = (
    <>
      {stack}
      {count}
    </>
  );

  if (!interactive) {
    return (
      <div className={boxClass} role="img" aria-label={`멤버 ${totalCount}명`}>
        {body}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={cn(
          boxClass,
          'cursor-pointer text-left transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
        )}
        aria-label={`멤버 ${totalCount}명, 전체 보기`}
      >
        {body}
      </button>

      <MemberCardModal
        isOpen={isOpen}
        open={open}
        close={close}
        modalMode="all"
        selectedMember={null}
        members={sortedMembers}
      />
    </>
  );
}
