import { useKakaoSignIn } from '@/features/auth/hooks/useKakaoSignIn';
import { IconKakao } from '@/shared/ui/icons';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const { mutate: kakaoSignIn } = useKakaoSignIn();
  const isCalled = useRef(false);

  useEffect(() => {
    if (isCalled.current) return;

    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      toast.error('카카오 로그인을 취소했거나 오류가 발생했습니다.');
      router.replace('/login');
      return;
    }

    if (code) {
      isCalled.current = true;
      kakaoSignIn(
        {
          redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI as string,
          token: code,
        },
        {
          onSuccess: () => {
            toast.success('카카오 계정으로 로그인 되었습니다.');
            router.replace('/');
          },
          onError: () => {
            router.replace('/login');
          },
        },
      );
    } else {
      router.replace('/login');
    }
  }, [router, kakaoSignIn]);

  return (
    <main className="bg-background-secondary flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl bg-white px-8 py-10 text-center shadow-sm">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-full w-full animate-spin rounded-full border-4 border-gray-100 border-t-[#FEE500]"></div>
          <IconKakao size={24} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-txt-primary text-xl font-bold">카카오 로그인 중</h2>
          <p className="text-txt-secondary text-sm font-medium">
            계정 정보를 안전하게
            <br />
            가져오고 있습니다.
          </p>
        </div>
      </div>
    </main>
  );
}
