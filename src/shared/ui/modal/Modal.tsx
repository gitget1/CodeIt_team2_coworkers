import {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

export interface ModalContextProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  titleId: string;
  descriptionId: string;
  isTitleRendered: boolean;
  isDescriptionRendered: boolean;
  setTitleRendered: Dispatch<SetStateAction<boolean>>;
  setDescriptionRendered: Dispatch<SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextProps | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal 서브 컴포넌트는 Modal 내에서 사용되어야 합니다.');
  }
  return context;
};

export function useModalPartPresence(setRendered: Dispatch<SetStateAction<boolean>>) {
  useEffect(() => {
    setRendered(true);
    return () => setRendered(false);
  }, [setRendered]);
}

interface ModalRootProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, open, close, children }: ModalRootProps) {
  const [isTitleRendered, setTitleRendered] = useState(false);
  const [isDescriptionRendered, setDescriptionRendered] = useState(false);

  const titleId = useId();
  const descriptionId = useId();

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
        setTitleRendered,
        setDescriptionRendered,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
