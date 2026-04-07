import Image from 'next/image';
import logoLg from '@/shared/assets/images/logo-lg.png';
import { ResetPasswordForm } from '@/features/auth/ui/ResetPasswordForm';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

interface ResetPasswordPageProps {
  token: string | null;
}

export const getServerSideProps: GetServerSideProps<ResetPasswordPageProps> = async (context) => {
  const { token } = context.query;
  const validToken = Array.isArray(token) ? token[0] : token || null;

  return {
    props: {
      token: validToken,
    },
  };
};

export default function ResetPasswordPage({ token }: ResetPasswordPageProps) {
  return (
    <main className="bg-background-secondary flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-120">
        <header className="mb-8 flex justify-center">
          <Image src={logoLg} alt="Coworkers Logo" className="object-contain" priority />
        </header>

        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <div className="rounded-2xl bg-white px-5 py-12 text-center shadow-sm md:px-10">
            <h1 className="text-status-danger mb-4 text-xl font-bold">유효하지 않은 링크입니다</h1>
            <p className="text-txt-secondary text-md mb-8 font-medium">
              비밀번호 재설정 링크가 <br className="block md:hidden" /> 만료되었거나 잘못된
              접근입니다.
              <br />
              이메일 링크를 다시 한 번 확인해주세요.
            </p>
            <Link
              href="/login"
              className="text-brand-primary hover:text-interaction-hover mt-4 inline-block text-lg font-semibold underline"
            >
              로그인 페이지로 돌아가기
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
