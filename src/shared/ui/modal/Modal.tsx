import { createContext, useCallback, useContext, useEffect, useId, useState } from 'react';

export interface ModalContextProps {
  isOpen: boolean;
  open?: () => void;
  close: () => void;
  titleId: string;
  descriptionId: string;
  isTitleRendered: boolean;
  isDescriptionRendered: boolean;
  registerTitle: () => void;
  deregisterTitle: () => void;
  registerDescription: () => void;
  deregisterDescription: () => void;
}

const ModalContext = createContext<ModalContextProps | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal 서브 컴포넌트는 Modal 내에서 사용되어야 합니다.');
  }
  return context;
};

export function useModalPartPresence(register: () => void, deregister: () => void) {
  useEffect(() => {
    register();
    return () => deregister();
  }, [register, deregister]);
}

interface ModalRootProps {
  isOpen: boolean;
  open?: () => void;
  close: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, open = () => {}, close, children }: ModalRootProps) {
  const [isTitleRendered, setTitleRendered] = useState(false);
  const [isDescriptionRendered, setDescriptionRendered] = useState(false);

  const titleId = useId();
  const descriptionId = useId();

  const registerTitle = useCallback(() => setTitleRendered(true), []);
  const deregisterTitle = useCallback(() => setTitleRendered(false), []);
  const registerDescription = useCallback(() => setDescriptionRendered(true), []);
  const deregisterDescription = useCallback(() => setDescriptionRendered(false), []);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        open,
        close,
        titleId,
        descriptionId,
        isTitleRendered,
        isDescriptionRendered,
        registerTitle,
        deregisterTitle,
        registerDescription,
        deregisterDescription,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
