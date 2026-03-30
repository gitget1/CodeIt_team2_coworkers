import { RecurrenceDto } from '../../model/dto/recurrence.dto';
import { Recurrence } from '../../model/entities/recurrence.model';

export const toRecurrence = (dto: RecurrenceDto): Recurrence => ({
  name: dto.name,
  description: dto.description ?? undefined,
  startDate: new Date(dto.startDate),
  type: dto.frequencyType,
  monthDay: dto.monthDay,
  weekDays: dto.weekDays,
});
