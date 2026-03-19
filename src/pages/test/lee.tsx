import React, { useState } from 'react';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { useSignIn } from '@/features/auth/hooks/useSignIn';
import { useSignUp } from '@/features/auth/hooks/useSignUp';
import { useSignOut } from '@/features/auth/hooks/useSignOut';

const AuthTestPage = () => {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const signInMutation = useSignIn();
  const signUpMutation = useSignUp();
  const signOutMutation = useSignOut();

  // 입력 폼 상태 관리
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
    passwordConfirmation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signInMutation.mutate({ email: formData.email, password: formData.password });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    // 간단한 클라이언트 사이드 검증
    if (formData.password !== formData.passwordConfirmation) {
      alert('비밀번호가 일치하지 않습니다!');
      return;
    }

    signUpMutation.mutate(formData, {
      onSuccess: () => alert('회원가입 성공! 🎉'),
      onError: (error: any) => alert(`가입 실패: ${error.message}`),
    });
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>🔐 인증 로직 테스트 v2</h1>

      {/* 현재 상태 */}
      <div style={{ padding: '15px', backgroundColor: '#eee', marginBottom: '20px' }}>
        <strong>현재 유저:</strong> {isUserLoading ? '확인 중...' : user ? user.id : '게스트'}
      </div>

      {/* 회원가입 폼 (4개 필드) */}
      <section style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
        <h2>📝 회원가입 (Proxy 노선)</h2>
        <form
          onSubmit={handleSignUp}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <input name="email" placeholder="이메일" onChange={handleChange} />
          <input name="nickname" placeholder="닉네임" onChange={handleChange} />
          <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} />
          <input
            name="passwordConfirmation"
            type="password"
            placeholder="비밀번호 확인"
            onChange={handleChange}
          />
          <button type="submit" disabled={signUpMutation.isPending}>
            {signUpMutation.isPending ? '처리 중...' : '회원가입'}
          </button>
        </form>
      </section>

      {/* 로그인 폼 */}
      <section style={{ border: '1px solid #ccc', padding: '20px' }}>
        <h2>🔑 로그인 (BFF 노선)</h2>
        <form
          onSubmit={handleSignIn}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <input name="email" placeholder="이메일" onChange={handleChange} />
          <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} />
          <button type="submit">로그인</button>
        </form>
      </section>

      {user && (
        <button
          onClick={() => signOutMutation.mutate()}
          style={{ marginTop: '20px', width: '100%', color: 'red' }}
        >
          로그아웃
        </button>
      )}
    </div>
  );
};

export default AuthTestPage;
