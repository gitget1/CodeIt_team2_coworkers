import { IconKakao } from '@/shared/ui/icons';

interface KakaoAuthButtonProps {
  onClick: () => void;
}

export function KakaoAuthButton({ onClick }: KakaoAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-background-inverse flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#FEE500] transition-colors hover:bg-[#FDD800]"
    >
      <IconKakao size={16} />
      <span className="text-lg font-semibold">카카오로 시작하기</span>
    </button>
  );
}
