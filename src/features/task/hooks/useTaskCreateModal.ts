import { useState } from 'react';
import { RecurrenceType } from '../model/types/recurrence.type';

export function useTaskCreateModal() {
  const [openField, setOpenField] = useState<'date' | 'time' | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [recurrence, setRecurrence] = useState<RecurrenceType>('ONCE');
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const getStartDateTime = () => {
    if (!date) return new Date();
    if (!time) return date;

    const [hour, minute] = time.split(':').map(Number);
    const result = new Date(date);
    result.setHours(hour, minute, 0, 0);

    return result;
  };

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
    startDate: getStartDateTime(),
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
