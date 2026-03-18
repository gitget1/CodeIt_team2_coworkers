import { useSyncExternalStore } from 'react';

type Listener = () => void;

let isExpanded = true;
const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return isExpanded;
}

function getServerSnapshot() {
  return true;
}

function setExpanded(value: boolean) {
  if (isExpanded === value) return;
  isExpanded = value;
  listeners.forEach((l) => l());
}

function toggle() {
  setExpanded(!isExpanded);
}

/**
 * 사이드바 펼침/접힘 전역 상태.
 * 앱 어디서든 읽기·토글 가능해 확장성(다른 레이아웃/모달에서 제어 등)을 고려했습니다.
 */
export const sidebarStore = {
  getState: () => getSnapshot(),
  setExpanded,
  toggle,
  subscribe,
};

/**
 * 전역 사이드바 상태를 구독하는 훅.
 * Sidebar 트리 밖에서도 사용 가능합니다.
 */
export function useSidebarStore() {
  const isExpanded = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { isExpanded, toggle, setExpanded };
}
