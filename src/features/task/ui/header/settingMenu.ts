export type GroupRole = 'ADMIN' | 'MEMBER';

type MenuItem = {
  label: string;
  onClick: () => void;
};

export function SettingMenu(role: GroupRole): MenuItem[] {
  if (role === 'ADMIN') {
    return [
      { label: '수정하기', onClick: () => console.log('Edit') },
      { label: '삭제하기', onClick: () => console.log('Delete') },
    ];
  }

  return [{ label: '탈퇴하기', onClick: () => console.log('Leave')}];
}

/** TODO:
 * 팀 수정, 삭제 / 멤버 일 시 탈퇴 기능 완성 시 연결 작업 필요
 * onClick에 실제 기능 연결하기 임시로 console.log로 대체
 */
