import Checkbox from '@/shared/ui/checkbox';
import { Task } from '../model/entities/task.model';
import { Button } from '@/shared/ui/Button';

type Props = {
  task: Task;
};

export default function TaskItem({ task }: Props) {
  return (
    <li className="flex items-center justify-between rounded-lg border bg-white px-3 py-2">
      <div className="flex items-center gap-3">
        <Checkbox />
        <div>
          <p className="text-sm font-medium text-gray-800">{task.title}</p>
          {task.description && <p className="text-xs text-gray-400">{task.description}</p>}
        </div>
      </div>

      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
        ...
      </Button>
    </li>
  );
}
