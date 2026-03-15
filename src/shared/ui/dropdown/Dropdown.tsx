import useClickOutside from '@/shared/hooks/useClickOutside';
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  useId,
  useMemo,
} from 'react';

interface DropdownContextType {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  menuRef: React.RefObject<HTMLDivElement | null>;
  menuId: string;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('Dropdown components must be used within Dropdown');
  return context;
};

export default function Dropdown({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useClickOutside({
    refs: [triggerRef, menuRef],
    enabled: isOpen,
    onClickOutside: () => setOpen(false),
  });

  const value = useMemo(
    () => ({
      isOpen,
      setOpen,
      triggerRef,
      menuRef,
      menuId: `dropdown-menu-${id}`,
    }),
    [id, isOpen],
  );

  return (
    <DropdownContext.Provider value={value}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}
