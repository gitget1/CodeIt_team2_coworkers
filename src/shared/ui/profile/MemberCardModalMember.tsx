import { useState } from 'react';
import { getImageSrc } from '@/shared/lib/getImageSrc';
import { IconUser } from '@/shared/ui/icons';
import type { MemberCardItem } from './memberCard.types';
import { useCopyToClipboard } from '@/shared/hooks/useCopyToClipboard';

type Props = {
  member: MemberCardItem | null;
};

export function MemberCardModalMember({ member }: Props) {
  const [imgError, setImgError] = useState(false);
  const { copyText } = useCopyToClipboard();

  if (!member) return null;

  const email = member.email?.trim() ?? '';
  const imageSrc = member.imageSrc;
  const showImage = imageSrc != null && !imgError;

  const handleCopyEmail = async () => {
    await copyText(email, {
      successMessage: '이메일이 복사되었습니다.',
      errorMessage: '이메일 복사에 실패했습니다.',
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-background-tertiary">
        {showImage ? (
          <img
            src={getImageSrc(imageSrc)}
            alt=""
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <IconUser size={40} className="text-icon-inverse" aria-hidden />
        )}
      </div>

      <div className="flex min-w-0 max-w-full flex-col items-center gap-1">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <p className="text-lg font-bold text-txt-primary">{member.name}</p>
          {member.isAdmin ? (
            <span className="shrink-0 rounded-md bg-brand-secondary px-1.5 py-0.5 text-[10px] font-semibold text-brand-primary">
              관리자
            </span>
          ) : null}
        </div>
        {email ? (
          <p className="w-full break-all text-sm text-txt-secondary">{email}</p>
        ) : (
          <p className="text-sm text-txt-default">등록된 이메일이 없습니다.</p>
        )}
      </div>

      <button
        type="button"
        onClick={handleCopyEmail}
        disabled={!email}
        className="h-12 w-full rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        이메일 복사하기
      </button>
    </div>
  );
}
