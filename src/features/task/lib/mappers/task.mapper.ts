import { formatTime } from '@/shared/lib/date';
import { RecurrenceDto } from '../../model/dto/recurrence.dto';
import {
  TaskDto,
  TaskListDto,
  UpdateRecurringDto,
  UpdateTaskDto,
  UserDto,
} from '../../model/dto/task.dto';
import { Task, TaskList, User } from '../../model/entities/task.model';
import { CreateRecurringParams, CreateTaskParams } from '../../model/params/task.create.params';
import { TaskFormValues } from '../../ui/create-task/taskForm.types';
import { UpdateRecurringParams, UpdateTaskParams } from '../../model/params/task.update.params';

export const toUser = (dto: UserDto): User => ({
  id: dto.id,
  nickname: dto.nickname,
  imageUrl: dto.image ?? undefined,
});

export const toTask = (dto: TaskDto): Task => ({
  id: dto.id,
  title: dto.name,
  description: dto.description ?? undefined,
  order: dto.displayIndex,
  commentCount: dto.commentCount,
  writer: toUser(dto.writer),
  isCompleted: Boolean(dto.doneAt),
  completedBy: dto.doneBy?.user ? toUser(dto.doneBy.user) : undefined,
  completedAt: dto.doneAt ?? undefined,
  isDeleted: Boolean(dto.deletedAt),
  date: dto.date ? new Date(dto.date) : undefined,
  recurrence: dto.frequency,
  recurrenceId: dto.recurringId ?? undefined,
});

export const toTaskList = (dto: TaskListDto): TaskList => ({
  id: dto.id,
  groupId: dto.groupId,
  title: dto.name,
  order: dto.displayIndex,
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt),
  tasks: dto.tasks.map(toTask),
});

export const toTaskListFromArray = (
  dtos: TaskDto[],
  groupId: number,
  taskListId: number,
): TaskList => ({
  id: taskListId,
  groupId,
  title: '',
  order: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  tasks: dtos.map(toTask),
});

export const toCreateTaskDto = (model: CreateTaskParams): Partial<TaskDto> => {
  return {
    name: model.name,
    description: model.description ?? null,
    date: model.startDate ? model.startDate.toISOString() : null,
    frequency: model.frequencyType,
  };
};

export const toCreateRecurringDto = (model: CreateRecurringParams): Partial<RecurrenceDto> => {
  return {
    name: model.name,
    description: model.description ?? null,
    startDate: model.startDate.toISOString(),
    frequencyType: model.frequencyType,
    ...(model.frequencyType === 'WEEKLY' &&
      model.weekDays && {
        weekDays: model.weekDays,
      }),
    ...(model.frequencyType === 'MONTHLY' && {
      monthDay: model.monthDay,
    }),
  };
};

export const toFormValues = (task: Task): TaskFormValues => {
  return {
    title: task.title,
    description: task.description ?? '',
    dateTime: {
      date: task.date,
      time: formatTime(task.date),
    },
    recurrence: task.recurrence,
    selectedDays: [],
  };
};

export const toUpdateTask = (params: UpdateTaskParams): UpdateTaskDto => {
  return {
    name: params.name,
    description: params.description,
    done: params.done,
  };
};
