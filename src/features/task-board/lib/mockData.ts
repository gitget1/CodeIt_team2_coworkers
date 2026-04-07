import type { TaskBoard } from '../model/taskBoard.types';

export const MOCK_TASK_BOARD: TaskBoard = {
  columns: [
    {
      id: 'todo',
      status: 'TODO',
      taskGroups: [
        {
          id: 'card-todo-1',
          name: '법인 설립',
          tasks: [
            { id: 'todo-1-task-1', title: '법인 설립 안내 드리기', completed: false },
            { id: 'todo-1-task-2', title: '법인 설립 혹은 변경 등기 비용 안내 드리기', completed: false },
            { id: 'todo-1-task-3', title: '의뢰해주신 정보로 등기신청서 초안 작성', completed: false },
          ],
        },
        {
          id: 'card-todo-2',
          name: '세무 대리인 지정',
          tasks: [
            { id: 'todo-2-task-1', title: '기초 서류 수집 체크리스트 전달', completed: true },
            { id: 'todo-2-task-2', title: '홈택스 계정 권한 확인', completed: false },
          ],
        },
      ],
    },
    {
      id: 'in-progress',
      status: 'IN_PROGRESS',
      taskGroups: [
        {
          id: 'card-progress-1',
          name: '법인 설립',
          tasks: [
            { id: 'progress-1-task-1', title: '법인 설립 안내 드리기', completed: true },
            { id: 'progress-1-task-2', title: '법인 설립 혹은 변경 등기 비용 안내 드리기', completed: true },
            { id: 'progress-1-task-3', title: '의뢰해주신 정보로 등기신청서 초안 작성', completed: false },
          ],
        },
        {
          id: 'card-progress-2',
          name: '근로계약서 정비',
          tasks: [
            { id: 'progress-2-task-1', title: '기존 계약서 조항 검토', completed: true },
            { id: 'progress-2-task-2', title: '수정안 반영본 공유', completed: false },
            { id: 'progress-2-task-3', title: '최종안 승인 요청', completed: false },
          ],
        },
      ],
    },
    {
      id: 'done',
      status: 'DONE',
      taskGroups: [
        {
          id: 'card-done-1',
          name: '법인 설립',
          tasks: [
            { id: 'done-1-task-1', title: '법인 설립 안내 드리기', completed: true },
            { id: 'done-1-task-2', title: '법인 설립 혹은 변경 등기 비용 안내 드리기', completed: true },
            { id: 'done-1-task-3', title: '의뢰해주신 정보로 등기신청서 초안 작성', completed: true },
          ],
        },
      ],
    },
  ],
};
