import Dropdown from '@/shared/ui/dropdown';
import { IconArrowDown } from '@/shared/ui/icons';

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ArticleDropDown({ value, onChange }: SortDropdownProps) {
  const handleSelect = (option: string) => {
    onChange(option);
  };

  return (
    <Dropdown>
      <Dropdown.Trigger className="flex w-30 items-center gap-5 rounded-xl border border-slate-200 px-4 py-2 text-gray-700 ">
        {value}
        <IconArrowDown />
      </Dropdown.Trigger>

      <Dropdown.Menu className="w-30 overflow-hidden">
        <Dropdown.Item onClick={() => handleSelect('최신순')}>
          최신순
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSelect('좋아요 많은순')}  className="whitespace-nowrap">
          좋아요 많은순
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}