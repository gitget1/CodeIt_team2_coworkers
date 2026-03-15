import { useDropdown } from '../ui/dropdown/Dropdown';

export function useDropdownTrigger() {
  const { isOpen, setOpen, triggerRef, menuId } = useDropdown();

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  };

  return {
    triggerProps: {
      ref: triggerRef,
      type: 'button' as const,
      onClick: handleToggle,
      onKeyDown: handleKeyDown,
      'aria-haspopup': 'menu' as const,
      'aria-expanded': isOpen,
      'aria-controls': menuId,
    },
    isOpen,
  };
}
