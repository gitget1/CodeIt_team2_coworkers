import { IconPencil } from '@/shared/ui/icons/IconPencil';
import ArticleDropDown from './ArticleDropDown';
import { useUserQuery } from '@/features/user';
import { useRouter } from 'next/router';

type BoardToolbarProps = {
  sortOption: 'recent' | 'like';
  onChangeSort: (value: 'recent' | 'like') => void;
};
export function BoardToolbar({ sortOption, onChangeSort }: BoardToolbarProps) {
  const { data: user, isLoading } = useUserQuery();

  const isLoggedIn = isLoading ? undefined : !!user;
  const router = useRouter();
  return (
    <div className="flex w-full max-w-[1074px] justify-between">
      <ArticleDropDown value={sortOption} onChange={onChangeSort} />
      {isLoggedIn ? (
        <button
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-blue-500 bg-blue-500"
          onClick={() => router.push('/boards/createArticle')}
        >
          <IconPencil size={24} className="text-white" />
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}
