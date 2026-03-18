import { createContext, useContext } from 'react';

export interface SidebarContextValue {
  /** 사이드바가 펼쳐져 있는지. 하위 컴포넌트는 이 값만 사용 (isCollapsed 대신 isExpanded로 통일) */
  isExpanded: boolean;
  onToggle: () => void;
  /** 사이드바 패널 id. 토글 버튼 aria-controls 연결용 */
  sidebarId: string | null;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebarContext(): SidebarContextValue | null {
  return useContext(SidebarContext);
}

export { SidebarContext };
