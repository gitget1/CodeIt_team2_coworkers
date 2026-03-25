import { useState, useEffect } from 'react';
import { ProfileEdit } from '@/shared/ui/profile';

export function ProfileForm() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    // 초기 렌더링 시 상태 설정
    setIsMobile(mediaQuery.matches);

    // 창 크기가 바뀔 때마다 상태 업데이트
    const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const handleProfileChange = (file: File | null) => {
    // TODO: 프로필 이미지 변경 시 실행될 로직
  };

  return (
    <div className="mb-8 flex flex-col items-center justify-center">
      <ProfileEdit
        size={isMobile ? 'account-mobile' : 'account-pc'}
        alt="내 프로필 이미지"
        onChange={handleProfileChange}
      />
    </div>
  );
}
