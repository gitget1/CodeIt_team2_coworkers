import { useDropdown } from './Dropdown';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function DropdownItem({ children, onClick }: Props) {
  const { setOpen } = useDropdown();

  const handleClick = () => {
    setOpen(false);
    onClick?.();
  };

  return (
    <div
      onClick={handleClick}
      className="hover:bg-brand-primary w-full cursor-pointer px-[18px] py-[12px] text-center text-lg text-gray-800 hover:text-white"
    >
      {children}
    </div>
  );
}
