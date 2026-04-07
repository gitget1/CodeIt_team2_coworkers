import Dropdown from '@/shared/ui/dropdown';
import { IconArrowDown } from '@/shared/ui/icons';

type SortOption = 'recent' | 'like';
interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const OPTIONS: { label: string; value: SortOption }[] = [
  { label: '최신순', value: 'recent' },
  { label: '인기순', value: 'like' },
];
export default function ArticleDropDown({ value, onChange }: SortDropdownProps) {
  const selectedLabel = OPTIONS.find((opt) => opt.value === value)?.label ?? '';

  return (
    <Dropdown>
      <Dropdown.Trigger className="flex min-w-30 items-center gap-5 rounded-xl border border-slate-200 px-4 py-2 whitespace-nowrap text-gray-700">
        {selectedLabel}
        <IconArrowDown />
      </Dropdown.Trigger>

      <Dropdown.Menu className="w-30 overflow-hidden">
        {OPTIONS.map((option) => (
          <Dropdown.Item
            key={option.value}
            onClick={() => onChange(option.value)}
            className="whitespace-nowrap"
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
