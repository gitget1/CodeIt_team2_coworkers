import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface DropdownContextType {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('Dropdown components must be used within Dropdown');
  return context;
};

export default function Dropdown({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, setOpen, triggerRef, menuRef }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}
