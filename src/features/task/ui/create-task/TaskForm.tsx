import { Input } from '@/shared/ui/input/Input';
import { FormField } from '@/shared/ui/formfield';
import { Button } from '@/shared/ui/Button';
import DateField from '../../dateTimeField/dateField';
import RecurrenceField from '../../components/recurrenceField';
import TimeField from '../../dateTimeField/timeField';
import { useTaskForm } from './useTaskForm';

type Props = {
  form: ReturnType<typeof useTaskForm>;
  onSubmit: () => void;
  isPending: boolean;
};

export default function TaskForm({ form, onSubmit, isPending }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-txt-primary text-lg">할 일 만들기</h2>
        <p className="text-md text-txt-default">
          할 일은 실제로 행동 가능한 작업 중심으로
          <br />
          작성해주시면 좋습니다.
        </p>
      </div>

      <FormField>
        <FormField.Label>할 일 제목</FormField.Label>
        <FormField.Control>
          <Input
            value={form.title}
            onChange={(e) => form.setTitle(e.target.value)}
            placeholder="할 일 제목을 입력해주세요."
          />
        </FormField.Control>
        <FormField.Message>테스트</FormField.Message>
      </FormField>

      <FormField>
        <FormField.Label>시작 날짜 및 시간</FormField.Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="w-full sm:w-[204px]">
            <DateField
              className="text-txt-default !font-regular border-background-tertiary rounded-xl text-lg"
              value={form.date}
              onChange={(d) => {
                form.setDate(d);
                form.setOpenField(null);
              }}
              open={form.openField === 'date'}
              onToggle={() => form.setOpenField((prev) => (prev === 'date' ? null : 'date'))}
            />
          </div>
          <div className="w-full sm:w-[124px]">
            <TimeField
              className="text-txt-default !font-regular border-background-tertiary rounded-xl text-lg"
              value={form.time}
              onChange={(t) => {
                form.setTime(t);
                form.setOpenField(null);
              }}
              open={form.openField === 'time'}
              onToggle={() => form.setOpenField((prev) => (prev === 'time' ? null : 'time'))}
            />
          </div>
        </div>
      </FormField>

      <FormField>
        <FormField.Label>반복 설정</FormField.Label>
        <RecurrenceField
          value={form.recurrence}
          onChange={form.setRecurrence}
          selectedDays={form.selectedDays}
          onChangeDays={form.setSelectedDays}
        />
      </FormField>

      <FormField>
        <FormField.Label>할 일 메모</FormField.Label>
        <FormField.Control>
          <Input value={form.description} onChange={(e) => form.setDescription(e.target.value)} />
        </FormField.Control>
      </FormField>

      <Button onClick={onSubmit} disabled={isPending}>
        만들기
      </Button>
    </div>
  );
}
