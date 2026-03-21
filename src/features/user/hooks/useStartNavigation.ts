import { useRouter } from 'next/router';
import { useUserQuery } from './useUserQuery';

export function useStartNavigation() {
  const router = useRouter();
  const { data: user, isLoading } = useUserQuery();

  const navigateToStart = () => {
    if (isLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    const firstGroupId = user.memberships?.[0]?.groupId;

    if (firstGroupId) {
      router.push(`/${firstGroupId}`);
    } else {
      router.push('/boards');
    }
  };

  return { navigateToStart, isLoading };
}
