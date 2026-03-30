import Dropdown from '@/shared/ui/dropdown';
import { IconKebab } from '@/shared/ui/icons';

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
  showEdit?: boolean;
  showDelete?: boolean;
}

export default function KebabMenu({ onEdit, onDelete, showEdit = true, showDelete = true }: Props) {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <IconKebab className="text-icon-primary" />
      </Dropdown.Trigger>

      <Dropdown.Menu align="right" className="-mt-2 w-30">
        {showEdit && <Dropdown.Item onClick={onEdit}>수정</Dropdown.Item>}

        {showDelete && <Dropdown.Item onClick={onDelete}>삭제</Dropdown.Item>}
      </Dropdown.Menu>
    </Dropdown>
  );
}
