import { useUserQuery } from '@/features/user/hooks/useUserQuery';
import { Button } from '@/shared/ui/Button';
import { useRouter } from 'next/router';

export const CTAButton = () => {
  const router = useRouter();
  const { data: user, isLoading } = useUserQuery();

  const handleStart = () => {
    if (isLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    const hasTeam = user.memberships && user.memberships.length > 0;

    if (hasTeam) {
      const firstGroupId = user.memberships[0].groupId;
      router.push(`/${firstGroupId}`);
    } else {
      router.push('/boards');
    }
  };

  return (
    <Button variant="primary" size="lg" onClick={handleStart} disabled={isLoading}>
      지금 시작하기
    </Button>
  );
};
