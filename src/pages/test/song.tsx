import { useState } from 'react';
import { toast } from 'sonner';

import { useSignIn } from '@/features/auth/hooks/useSignIn';
import { useUserQuery } from '@/features/user/hooks/useUserQuery';
import { useUserGroupsQuery } from '@/features/user/hooks/useUserGroupsQuery';
import { useUpdateUserMutation } from '@/features/user/hooks/useUpdateUserMutation';
import { useUpdatePasswordMutation } from '@/features/user/hooks/useUpdatePasswordMutation';
import { useDeleteUserMutation } from '@/features/user/hooks/useDeleteUserMutation';

import { useQueryClient } from '@tanstack/react-query';
import { USER_QUERY_KEYS } from '@/features/user/lib/queryKeys';

export default function UserTestPage() {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [nickname, setNickname] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const signInMutation = useSignIn();
  const { data: user, isLoading: isUserLoading } = useUserQuery();
  const { data: groups } = useUserGroupsQuery();

  // 데이터 변경 훅
  const updateProfileMutation = useUpdateUserMutation();
  const updatePasswordMutation = useUpdatePasswordMutation();
  const deleteUserMutation = useDeleteUserMutation();

  // 로그인 실행
  const handleSignIn = () => {
    if (!email || !loginPassword) return toast.warning('이메일과 비밀번호를 입력해주세요.');

    signInMutation.mutate(
      { email, password: loginPassword },
      {
        onSuccess: () => {
          toast.success('로그인에 성공');
          setLoginPassword('');
          queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
        },
        onError: (error: any) => toast.error(error.message || '로그인 실패'),
      },
    );
  };

  // 이름 수정 실행
  const handleUpdateNickname = () => {
    updateProfileMutation.mutate(
      { nickname },
      {
        onSuccess: () => toast.success('프로필이 업데이트되었습니다!'),
        onError: (error) => toast.error(error.message),
      },
    );
  };

  // 비밀번호 변경 실행
  const handleUpdatePassword = () => {
    if (!newPassword) return toast.warning('새 비밀번호를 입력해주세요.');

    updatePasswordMutation.mutate(
      {
        password: newPassword,
        passwordConfirmation: newPassword,
      },
      {
        onSuccess: () => {
          toast.success('비밀번호 변경되었습니다.');
          setNewPassword('');
        },
        onError: (error) => toast.error(error.message),
      },
    );
  };

  return (
    <div className="mx-auto max-w-2xl space-y-10 p-8 pb-20">
      <h1 className="text-center text-3xl font-bold">유저 서비스 통합 테스트</h1>

      {/*로그인*/}
      <section className="border-brand-primary/20 rounded-2xl border-2 bg-white p-6 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">로그인 테스트</h2>
        <div className="space-y-3">
          <input
            className="focus:ring-brand-primary w-full rounded-xl border p-3 outline-none focus:ring-2"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="focus:ring-brand-primary w-full rounded-xl border p-3 outline-none focus:ring-2"
            placeholder="비밀번호 입력"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button
            onClick={handleSignIn}
            disabled={signInMutation.isPending}
            className="bg-brand-primary w-full rounded-xl py-3 font-bold text-white transition-opacity hover:opacity-90"
          >
            {signInMutation.isPending ? '로그인 중...' : '로그인 하기'}
          </button>
        </div>
      </section>

      <hr className="border-gray-100" />

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          로그인 정보 조회 (useUserQuery)
        </h2>
        {user ? (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <div className="mb-4 flex items-center gap-4">
              {user.profileImage && (
                <img
                  src={user.profileImage}
                  alt="profile"
                  className="h-12 w-12 rounded-full border"
                />
              )}
              <div>
                <p className="text-lg font-bold">{user.name} 님</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              현재 참여 중인 그룹:{' '}
              <span className="text-brand-primary font-bold">{groups?.length || 0}개</span>
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-400">
            로그인이 필요합니다.
          </div>
        )}
      </section>
      {/* 비밀번호 변경 */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-bold">비밀번호 변경 테스트</h2>
        <div className="flex gap-2">
          <input
            type="password"
            className="flex-1 rounded-xl border p-3 outline-none"
            placeholder="새 비밀번호 입력"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            onClick={handleUpdatePassword}
            disabled={updatePasswordMutation.isPending || !user}
            className="rounded-xl bg-orange-500 px-6 font-medium text-white disabled:bg-gray-300"
          >
            {updatePasswordMutation.isPending ? '변경 중...' : '비밀번호 변경'}
          </button>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-bold">데이터 수정 테스트</h2>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-xl border p-3 outline-none"
            placeholder="새 이름"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button
            onClick={handleUpdateNickname}
            disabled={updateProfileMutation.isPending || !user}
            className="rounded-xl bg-black px-6 font-medium text-white disabled:bg-gray-300"
          >
            변경
          </button>
        </div>
      </section>

      <button
        onClick={() => {
          if (!window.confirm('정말 탈퇴!!!?')) return;

          deleteUserMutation.mutate(undefined, {
            onSuccess: () => {
              toast.success('회원 탈퇴가 완료되었습니다.');
            },
            onError: (error) => {
              toast.error(error.message);
            },
          });
        }}
        disabled={!user || deleteUserMutation.isPending}
        className="text-status-danger border-status-danger hover:bg-status-danger/5 w-full rounded-2xl border-2 py-4 font-bold disabled:border-gray-200 disabled:text-gray-300"
      >
        {deleteUserMutation.isPending ? '처리 중...' : '회원 탈퇴'}
      </button>
    </div>
  );
}
