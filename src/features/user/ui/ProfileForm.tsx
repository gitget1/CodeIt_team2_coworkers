import { useState, useEffect, useRef } from 'react';
import { ProfileEdit } from '@/shared/ui/profile';
import { useUserQuery } from '../hooks/useUserQuery';
import { useUpdateUserMutation } from '../hooks/useUpdateUserMutation';
import { useUploadImageMutation } from '../hooks/useUploadImageMutation';
import { toast } from 'sonner';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

const UPLOAD_COOLDOWN_TIME = 1000;

export function ProfileForm() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // 중복 실행 막기위한 상태
  const [isUploading, setIsUploading] = useState(false);

  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());

  const lastCallTimeRef = useRef<number>(0);

  const { mutate: updateProfile, mutateAsync: updateProfileAsync } = useUpdateUserMutation();
  const { mutateAsync: uploadImageAsync } = useUploadImageMutation();

  const { data: user, isLoading } = useUserQuery();

  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mediaQuery.matches);
    const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const handleProfileChange = async (file: File | null) => {
    if (isUploading) return;

    // 현재 시간 - 마지막 호출 시간 < 더블 클릭 방지 시간
    const now = Date.now();
    if (now - lastCallTimeRef.current < UPLOAD_COOLDOWN_TIME) {
      return;
    }
    lastCallTimeRef.current = now;
    setIsUploading(true); // 이미지 업로드 시작

    if (!file) {
      updateProfile({ image: '' });
      setIsUploading(false); // early 리턴 시 로딩 방지
      return;
    }

    // 이미지 용량 제한 검사 10mb
    if (file.size > 10 * 1024 * 1024) {
      toast.error('이미지 용량은 10MB를 초과할 수 없습니다.');
      setIsUploading(false);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);

    toast.promise(
      (async () => {
        try {
          const { url: uploadedImageUrl } = await uploadImageAsync(file);
          await updateProfileAsync({ image: uploadedImageUrl });
          setImageTimestamp(Date.now());
        } finally {
          setIsUploading(false);
        }
      })(),
      {
        loading: '프로필 이미지를 업데이트 중입니다...',
        success: '프로필 이미지가 변경되었습니다.',
        error: '이미지 업로드에 실패했습니다.',
      },
    );
  };
  if (!isClient || isLoading) {
    return (
      <div className="mb-8 flex flex-col items-center justify-center">
        <Skeleton className="h-16 w-16 rounded-3xl md:h-25 md:w-25" />
      </div>
    );
  }

  const getServerImage = () => {
    if (!user?.profileImage) return undefined;
    const separator = user.profileImage.includes('?') ? '&' : '?';
    return `${user.profileImage}${separator}t=${imageTimestamp}`;
  };

  const displayImage = localPreview || getServerImage();

  return (
    <div className="mb-8 flex flex-col items-center justify-center">
      <ProfileEdit
        key={displayImage || 'empty-profile'}
        size={isMobile ? 'account-mobile' : 'account-pc'}
        alt="내 프로필 이미지"
        imageSrc={displayImage}
        onChange={handleProfileChange}
      />
    </div>
  );
}
