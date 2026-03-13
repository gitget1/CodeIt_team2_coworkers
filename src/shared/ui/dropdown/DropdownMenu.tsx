import { useDropdown } from './Dropdown';

interface Props {
  children: React.ReactNode;
}

export default function DropdownMenu({ children }: Props) {
  const { isOpen, menuRef } = useDropdown();

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-[140px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md"
    >
      {children}
    </div>
  );
}
