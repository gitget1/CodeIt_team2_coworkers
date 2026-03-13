import { useDropdown } from './Dropdown';

interface Props {
  children: React.ReactNode;
}

export default function DropdownTrigger({ children }: Props) {
  const { isOpen, setOpen, triggerRef } = useDropdown();

  return (
    <div ref={triggerRef} onClick={() => setOpen(!isOpen)} className="inline-block cursor-pointer">
      {children}
    </div>
  );
}