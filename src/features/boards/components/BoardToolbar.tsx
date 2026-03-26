import { IconPencil } from '@/shared/ui/icons/IconPencil';
import ArticleDropDown from './ArticleDropDown';

type BoardToolbarProps = {
  sortOption: 'recent' | 'like';
  onChangeSort: (value: 'recent' | 'like') => void;
};
export function BoardToolbar({ sortOption, onChangeSort }: BoardToolbarProps) {
  return (
    <div className="flex w-full max-w-[1074px] justify-between">
      <ArticleDropDown value={sortOption} onChange={onChangeSort} />
      <button className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-500 bg-blue-500">
        <IconPencil size={24} className="text-white" />
      </button>
    </div>
  );
}
