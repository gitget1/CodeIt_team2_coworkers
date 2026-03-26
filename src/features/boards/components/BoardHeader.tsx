import { IconSearch } from '@/shared/ui/icons/IconSearch';

type BoardHeaderProps = {
  search: string;
  onChangeSearch: (value: string) => void;
};

export function BoardHeader({ search, onChangeSearch }: BoardHeaderProps) {
  return (
    <header className="md:flex md:h-14 md:items-center md:justify-between">
      <h1 className="text-2xl font-bold">자유게시판</h1>
      <label className="mt-3 flex h-12 w-full items-center rounded-full border-2 border-blue-500 md:mt-0 md:h-14 md:w-105">
        <IconSearch size={32} className="ml-3 text-blue-400" />
        <input
          placeholder="검색어를 입력해주세요"
          className="ml-3 w-full text-base outline-none"
          value={search}
          onChange={(e) => onChangeSearch(e.target.value)}
        />
      </label>
    </header>
  );
}
