import { useState } from 'react';
import TaskCreateModal from './TaskCreateModal';
import type { TaskCommonParams } from '../../model/params/task.params';

type Props = {
  params: TaskCommonParams;
};

export default function TaskCreateButton({ params }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-blue-500 px-4 py-2 text-white"
      >
        할 일 생성
      </button>

      <TaskCreateModal isOpen={isOpen} onClose={() => setIsOpen(false)} params={params} />
    </>
  );
}

// TODO: 임시 생성 버튼
