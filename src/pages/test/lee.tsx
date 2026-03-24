import { useState } from 'react';
import { useSendResetEmailMutation } from '@/features/auth/hooks/useSendResetEmailMutation'; // 경로에 맞게 수정해주세요
import { useResetPasswordMutation } from '@/features/auth/hooks/useResetPasswordMutation'; // 경로에 맞게 수정해주세요

export default function AuthApiTestPage() {
  // ==========================================
  // 1. 이메일 발송 테스트용 상태
  // ==========================================
  const [email, setEmail] = useState('');
  const [emailResult, setEmailResult] = useState<string | null>(null);

  const { mutate: sendEmail, isPending: isEmailSending } = useSendResetEmailMutation();

  const handleSendEmail = () => {
    sendEmail(
      {
        email,
        // 로컬 테스트용 Redirect URL (실제로는 환경변수 사용 권장)
        redirectUrl: 'http://localhost:3000/reset-password',
      },
      {
        onSuccess: (data) => setEmailResult(`✅ 성공: ${JSON.stringify(data)}`),
        onError: (error: any) =>
          setEmailResult(`❌ 실패: ${error.response?.data?.message || error.message}`),
      },
    );
  };

  // ==========================================
  // 2. 비밀번호 재설정 테스트용 상태
  // ==========================================
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [resetResult, setResetResult] = useState<string | null>(null);

  const { mutate: resetPassword, isPending: isResetting } = useResetPasswordMutation();

  const handleResetPassword = () => {
    resetPassword(
      { token, password, passwordConfirmation },
      {
        onSuccess: (data) => setResetResult(`✅ 성공: ${JSON.stringify(data)}`),
        onError: (error: any) =>
          setResetResult(`❌ 실패: ${error.response?.data?.message || error.message}`),
      },
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">🛠️ Auth API 테스트 샌드박스</h1>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* --------------------------------------------------
            [API 1] 비밀번호 재설정 이메일 발송
        -------------------------------------------------- */}
        <section className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-blue-600">1. 이메일 발송 API (POST)</h2>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="테스트할 이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-gray-300 p-2"
            />

            <button
              onClick={handleSendEmail}
              disabled={isEmailSending || !email}
              className="rounded-md bg-blue-500 p-2 font-bold text-white hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isEmailSending ? '전송 중...' : '이메일 발송 쏘기 🚀'}
            </button>
          </div>

          {emailResult && (
            <div className="mt-4 rounded-md bg-gray-100 p-3 text-sm break-all">
              <span className="font-semibold text-gray-700">응답 결과:</span>
              <p className="mt-1 text-gray-600">{emailResult}</p>
            </div>
          )}
        </section>

        {/* --------------------------------------------------
            [API 2] 비밀번호 재설정 완료
        -------------------------------------------------- */}
        <section className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-green-600">2. 비밀번호 재설정 API (PATCH)</h2>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="메일로 받은 Token 입력"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="rounded-md border border-gray-300 p-2"
            />
            <input
              type="password"
              placeholder="새 비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border border-gray-300 p-2"
            />
            <input
              type="password"
              placeholder="새 비밀번호 확인"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="rounded-md border border-gray-300 p-2"
            />

            <button
              onClick={handleResetPassword}
              disabled={isResetting || !token || !password || !passwordConfirmation}
              className="rounded-md bg-green-500 p-2 font-bold text-white hover:bg-green-600 disabled:bg-gray-400"
            >
              {isResetting ? '재설정 중...' : '비밀번호 변경 쏘기 🚀'}
            </button>
          </div>

          {resetResult && (
            <div className="mt-4 rounded-md bg-gray-100 p-3 text-sm break-all">
              <span className="font-semibold text-gray-700">응답 결과:</span>
              <p className="mt-1 text-gray-600">{resetResult}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
