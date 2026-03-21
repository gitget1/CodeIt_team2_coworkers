import { useState } from 'react';
import { useCreateTaskMutation } from '../../hooks/useCreateTaskMutation';
import { TaskCommonParams } from '../../model/params/task.params';
import { Modal } from '@/shared/ui/modal';
import { Input } from '@/shared/ui/input/Input';
import { FormField } from '@/shared/ui/formfield';
import { Button } from '@/shared/ui/Button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  params: TaskCommonParams;
};

export default function TaskCreateModal({ isOpen, onClose, params }: Props) {
  const { mutate, isPending } = useCreateTaskMutation(params);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [recurrence, setRecurrence] = useState<'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY'>('ONCE');
  const isoDate = date;

  const handleSubmit = () => {
    if (!title.trim()) return;

    mutate(
      {
        name: title,
        description,
        startDate: new Date(),
        frequencyType: recurrence,
        ...(recurrence === 'MONTHLY' && { monthDay: 1 }),
      },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
          onClose();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} open={() => {}} close={onClose}>
      <Modal.Content>
        <div>
          <Modal.Title>할 일 만들기</Modal.Title>
          <Modal.Description>ㅇㅇ</Modal.Description>

          <FormField>
            <FormField.Label>할 일 제목</FormField.Label>
            <FormField.Control>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="할 일 제목을 입력해주세요."
              />
            </FormField.Control>
            <FormField.Message>테스트</FormField.Message>
          </FormField>

          <FormField>
            <FormField.Label>날짜</FormField.Label>
            <FormField.Control>
              <Input />
            </FormField.Control>
            <FormField.Control>
              <Input />
            </FormField.Control>
          </FormField>

          <select value={recurrence} onChange={(e) => setRecurrence(e.target.value as any)}>
            <option value="ONCE">한 번</option>
            <option value="DAILY">매 일</option>
            <option value="WEEKLY">매 주</option>
            <option value="MONTHLY">매 월</option>
          </select>

          <FormField>
            <FormField.Label>할 일 메모</FormField.Label>
            <FormField.Control>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormField.Control>
          </FormField>

          <Button onClick={handleSubmit}>만들기</Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}

// TODO: 날짜 설정, 반복 설정 분리 예정
