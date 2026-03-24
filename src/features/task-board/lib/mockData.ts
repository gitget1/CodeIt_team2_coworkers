import type { TaskBoard } from '../model/taskBoard.types';

export const MOCK_TASK_BOARD: TaskBoard = {
  columns: [
    {
      id: 'todo',
      title: '할 일',
      cards: [
        {
          id: 'card-todo-1',
          title: '법인 설립',
          collapsed: false,
          tasks: [
            { id: 'todo-1-task-1', label: '법인 설립 안내 드리기', checked: false },
            { id: 'todo-1-task-2', label: '법인 설립 혹은 변경 등기 비용 안내 드리기', checked: false },
            { id: 'todo-1-task-3', label: '의뢰해주신 정보로 등기신청서 초안 작성', checked: false },
          ],
        },
        {
          id: 'card-todo-2',
          title: '세무 대리인 지정',
          collapsed: false,
          tasks: [
            { id: 'todo-2-task-1', label: '기초 서류 수집 체크리스트 전달', checked: true },
            { id: 'todo-2-task-2', label: '홈택스 계정 권한 확인', checked: false },
          ],
        },
      ],
    },
    {
      id: 'in-progress',
      title: '진행중',
      cards: [
        {
          id: 'card-progress-1',
          title: '법인 설립',
          collapsed: false,
          tasks: [
            { id: 'progress-1-task-1', label: '법인 설립 안내 드리기', checked: true },
            { id: 'progress-1-task-2', label: '법인 설립 혹은 변경 등기 비용 안내 드리기', checked: true },
            { id: 'progress-1-task-3', label: '의뢰해주신 정보로 등기신청서 초안 작성', checked: false },
          ],
        },
        {
          id: 'card-progress-2',
          title: '근로계약서 정비',
          collapsed: true,
          tasks: [
            { id: 'progress-2-task-1', label: '기존 계약서 조항 검토', checked: true },
            { id: 'progress-2-task-2', label: '수정안 반영본 공유', checked: false },
            { id: 'progress-2-task-3', label: '최종안 승인 요청', checked: false },
          ],
        },
      ],
    },
    {
      id: 'done',
      title: '완료',
      cards: [
        {
          id: 'card-done-1',
          title: '법인 설립',
          collapsed: false,
          tasks: [
            { id: 'done-1-task-1', label: '법인 설립 안내 드리기', checked: true },
            { id: 'done-1-task-2', label: '법인 설립 혹은 변경 등기 비용 안내 드리기', checked: true },
            { id: 'done-1-task-3', label: '의뢰해주신 정보로 등기신청서 초안 작성', checked: true },
          ],
        },
      ],
    },
  ],
};

