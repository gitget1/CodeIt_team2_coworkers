import { useKakaoSignIn } from '@/features/auth/hooks/useKakaoSignIn';
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
      <div className="flex flex-col items-center gap-4">
        <span className="text-txt-secondary animate-pulse text-lg font-medium">
          카카오 로그인 처리 중입니다...
        </span>
      </div>
    </main>
  );
}
