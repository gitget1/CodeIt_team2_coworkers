import { Input } from '@/shared/ui/input/Input';
import { FormField } from '@/shared/ui/formfield';
import { Button } from '@/shared/ui/Button';
import RecurrenceField from '../../components/recurrenceField';
import { Controller, useForm } from 'react-hook-form';
import { INITIAL_TASK_FORM_VALUES, TaskFormValues } from './taskForm.types';
import { CreateRecurringParams, CreateTaskParams } from '../../model/params/task.create.params';
import DateTimeField from '../../dateTimeField/dateTimeFiled';
import { toCreateTaskPayload } from '../../lib/createTaskPayload';
import { Toaster } from '@/shared/ui/toast/Toaster';
import { combineDateTime } from './taskForm.utils';

type Props = {
  mutate: (
    data: CreateTaskParams | CreateRecurringParams,
    options?: { onSuccess?: () => void },
  ) => void;
  isPending: boolean;
  onSuccess: () => void;
};

export default function TaskForm({ mutate, isPending, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<TaskFormValues>({ mode: 'onChange', defaultValues: INITIAL_TASK_FORM_VALUES });

  const onSubmit = (data: TaskFormValues) => {
    if (!data.date || !data.time) return;
    try {
      const payload = toCreateTaskPayload(data);

      console.log('🔥 recurrence:', data.recurrence);
      console.log('🔥 payload:', payload);

      mutate(payload, {
        onSuccess: () => {
          reset();
          onSuccess();
        },
      });
    } catch (e) {}
  };
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
            {...register('title', {
              required: '제목을 입력해주세요.',
            })}
          />
        </FormField.Control>
        <FormField.Message>{errors.title?.message}</FormField.Message>
      </FormField>

      <FormField>
        <FormField.Label>시작 날짜 및 시간</FormField.Label>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DateTimeField
              date={field.value}
              time={watch('time')}
              onChangeDate={(d) => setValue('date', d)}
              onChangeTime={(t) => setValue('time', t)}
            />
          )}
        />
        <FormField.Message>
          {(errors.date || errors.time) && '날짜와 시간을 모두 입력해주세요.'}
        </FormField.Message>
      </FormField>

      <FormField>
        <FormField.Label>반복 설정</FormField.Label>
        <RecurrenceField
          value={watch('recurrence')}
          onChange={(v) => {
            setValue('recurrence', v);
            if (v !== 'WEEKLY') {
              setValue('selectedDays', []);
            }
          }}
          selectedDays={watch('selectedDays') ?? []}
          onChangeDays={(days) => setValue('selectedDays', days)}
        />
      </FormField>

      <FormField>
        <FormField.Label>할 일 메모</FormField.Label>
        <FormField.Control>
          <Input {...register('description')} />
        </FormField.Control>
      </FormField>

      <Button onClick={handleSubmit(onSubmit)} disabled={!isValid}>
        만들기
      </Button>
    </div>
  );
}
