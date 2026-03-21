import { formatDate } from '@/shared/lib/date';
import { Button } from '@/shared/ui/Button';

type Props = {
  value?: Date;
  onClick: () => void;
};

export default function DateInput({ value, onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      variant="secondary"
      className="text-txt-default w-full justify-start text-left"
    >
      {formatDate(value) || '날짜'}
    </Button>
  );
}
