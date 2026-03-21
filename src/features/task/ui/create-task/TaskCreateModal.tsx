import { useState } from 'react';
import { useCreateTaskMutation } from '../../hooks/useCreateTaskMutation';
import { TaskCommonParams } from '../../model/params/task.params';
import { Modal } from '@/shared/ui/modal';
import { Input } from '@/shared/ui/input/Input';
import { FormField } from '@/shared/ui/formfield';
import { Button } from '@/shared/ui/Button';
import DateField from '../../dateTimeField/dateField';

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
      <Modal.Content size="md" className="overflow-y-auto px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <Modal.Title className="text-txt-primary text-lg">할 일 만들기</Modal.Title>
            <Modal.Description className="text-md text-txt-default">
              할 일은 실제로 행동 가능한 작업 중심으로
              <br />
              작성해주시면 좋습니다.
            </Modal.Description>
          </div>

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
            <FormField.Label>시작 날짜 및 시간</FormField.Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <DateField />
              </div>
              <div className="flex-1">
                <Input />
              </div>
            </div>
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
