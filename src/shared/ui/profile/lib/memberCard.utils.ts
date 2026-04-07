import type { MemberCardItem } from '../memberCard.types';

/** 관리자 멤버를 목록 상단에 두기 */
export function sortMembersAdminsFirst(list: MemberCardItem[]): MemberCardItem[] {
  return [...list].sort((a, b) => {
    const aAdmin = a.isAdmin ? 1 : 0;
    const bAdmin = b.isAdmin ? 1 : 0;
    return bAdmin - aAdmin;
  });
}
