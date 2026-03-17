import type { TaskListDto } from '../model/dto/task.dto';
import { RecurrenceType } from '../model/types/recurrence.type';


// 공통 유저
const mockUser = {
  id: 1,
  nickname: '인규',
  image: 'https://i.pravatar.cc/150?img=3',
};

// 반복 타입 예시
const DAILY: RecurrenceType = 'DAILY';
const WEEKLY: RecurrenceType = 'WEEKLY';

export const mockTaskList: TaskListDto = {
  id: 1,
  name: '오늘 할 일',
  displayIndex: 0,
  groupId: 1,
  createdAt: '2026-03-17T10:00:00.000Z',
  updatedAt: '2026-03-17T10:00:00.000Z',

  tasks: [
    {
      id: 101,
      name: '리액트 쿼리 정리하기',
      description: 'invalidateQueries까지 정리',
      date: '2026-03-17',
      frequency: DAILY,
      recurringId: 1,
      displayIndex: 0,
      commentCount: 3,
      doneAt: null,
      deletedAt: null,
      createdAt: '2026-03-17T09:00:00.000Z',
      updatedAt: '2026-03-17T09:30:00.000Z',
      writer: mockUser,
      doneBy: null,
    },
    {
      id: 102,
      name: 'API 에러 핸들링 추가',
      description: '에러 객체 매핑까지 하기',
      date: '2026-03-17',
      frequency: DAILY,
      recurringId: null,
      displayIndex: 1,
      commentCount: 1,
      doneAt: '2026-03-17T11:00:00.000Z',
      deletedAt: null,
      createdAt: '2026-03-17T08:00:00.000Z',
      updatedAt: '2026-03-17T11:00:00.000Z',
      writer: mockUser,
      doneBy: {
        user: mockUser,
      },
    },
    {
      id: 103,
      name: 'Dropdown 컴포넌트 리팩토링',
      description: null,
      date: null,
      frequency: WEEKLY,
      recurringId: 2,
      displayIndex: 2,
      commentCount: 0,
      doneAt: null,
      deletedAt: null,
      createdAt: '2026-03-16T10:00:00.000Z',
      updatedAt: '2026-03-16T10:00:00.000Z',
      writer: mockUser,
      doneBy: null,
    },
    {
      id: 104,
      name: '삭제된 태스크 테스트용',
      description: 'UI에서 필터링 확인',
      date: '2026-03-15',
      frequency: 'ONCE',
      recurringId: null,
      displayIndex: 3,
      commentCount: 2,
      doneAt: null,
      deletedAt: '2026-03-16T12:00:00.000Z',
      createdAt: '2026-03-15T10:00:00.000Z',
      updatedAt: '2026-03-16T12:00:00.000Z',
      writer: mockUser,
      doneBy: null,
    },
  ],
};