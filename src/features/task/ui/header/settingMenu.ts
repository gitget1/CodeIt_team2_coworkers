export type GroupRole = 'ADMIN' | 'MEMBER';
export type MenuKey = 'EDIT' | 'DELETE' | 'LEAVE';

type MenuItem = {
  label: string;
  key: MenuKey;
};

const MENU_BY_ROLE: Record<GroupRole, MenuItem[]> = {
  ADMIN: [
    { label: '수정하기', key: 'EDIT' },
    { label: '삭제하기', key: 'DELETE' },
  ],
  MEMBER: [{ label: '탈퇴하기', key: 'LEAVE' }],
};

export function SettingMenu(role: GroupRole): MenuItem[] {
  return MENU_BY_ROLE[role] ?? [];
}
