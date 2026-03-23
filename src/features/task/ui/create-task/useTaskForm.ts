import { useState } from 'react';
import { getStartDateTime } from './taskForm.utils';
import { RecurrenceType } from '../../model/types/recurrence.type';

export function useTaskForm() {
  const [openField, setOpenField] = useState<'date' | 'time' | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [recurrence, setRecurrence] = useState<RecurrenceType>('ONCE');
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate(undefined);
    setTime(undefined);
    setRecurrence('ONCE');
    setSelectedDays([]);
    setOpenField(null);
  };

  const createPayload = () => ({
    name: title,
    description,
    startDate: getStartDateTime(date, time),
    frequencyType: recurrence,
    ...(recurrence === 'MONTHLY' && date && { monthDay: date.getDate() }),
  });

  return {
    title,
    description,
    date,
    time,
    recurrence,
    selectedDays,
    openField,

    setTitle,
    setDescription,
    setDate,
    setTime,
    setRecurrence,
    setSelectedDays,
    setOpenField,

    resetForm,
    createPayload,
  };
}
