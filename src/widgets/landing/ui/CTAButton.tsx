import { Button } from '@/shared/ui/Button';

export const CTAButton = () => {
  const handleStart = () => {
    /**
     * TODO (@jaywai-lee)
     *
     * 페이지 작업 시 로그인 상태이고 팀이 있는 경우 push(/{groupId}), 팀이 없는 경우 push(/boards)
     * 비로그인 상태일 경우 push(/login) 로직 작성
     */
    console.log('click');
  };

  return (
    <Button variant="primary" size="lg" onClick={handleStart}>
      지금 시작하기
    </Button>
  );
};
