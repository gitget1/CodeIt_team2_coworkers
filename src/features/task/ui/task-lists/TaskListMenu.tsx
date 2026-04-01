import Dropdown from '@/shared/ui/dropdown';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export function TaskListMenu({ onEdit, onDelete }: Props) {
  return (
    <Dropdown>
      <Dropdown.Trigger
        onClick={(e) => e.stopPropagation()}
        className="text-icon-primary cursor-pointer rounded p-1 text-[#CBD5E1]"
      >
        ...
      </Dropdown.Trigger>
      <Dropdown.Menu className="absolute right-0 z-50 mt-2 w-28">
        <Dropdown.Item onClick={onEdit}>수정하기</Dropdown.Item>
        <Dropdown.Item onClick={onDelete}>삭제하기</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
