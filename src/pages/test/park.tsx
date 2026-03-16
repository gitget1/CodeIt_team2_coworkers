// 앞으로 사용할 임시 테스트 페이지

import Dropdown from '@/shared/ui/dropdown';
const edit = () => alert('수정 클릭');
const remove = () => alert('삭제 클릭');

export default function TestPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Dropdown>
        <Dropdown.Trigger>
          <button className="rounded bg-blue-500 px-4 py-2 text-white">드롭다운 메뉴</button>
        </Dropdown.Trigger>

        <Dropdown.Menu>
          <Dropdown.Item onClick={edit}>수정</Dropdown.Item>
          <Dropdown.Item onClick={remove}>삭제</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
