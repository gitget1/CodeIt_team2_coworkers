import { formatDateTime } from '@/shared/lib/date';
import { Task } from '../model/entities/task.model';
import { IconCalendar } from '@/shared/ui/icons/IconCalendar';
import { IconRepeat } from '@/shared/ui/icons/IconRepeat';
import { Button } from '@/shared/ui/Button';
import { IconCheck } from '@/shared/ui/icons';
import { IconCommentBtn } from '@/shared/ui/icons/IconCommentBtn';
import { Input } from '@/shared/ui/input/Input';

type Props = {
  task: Task | null;
  onClose: () => void;
};

type MetaItemProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
};

const recurrenceLabelMap: Record<string, string> = {
  ONCE: '한 번',
  DAILY: '매 일',
  WEEKLY: '매 주',
  MONTHLY: '매 달',
};

function MetaItem({ icon, children }: MetaItemProps) {
  return (
    <div className="text-txt-default flex items-center gap-1 text-xs">
      {icon}
      <span>{children}</span>
    </div>
  );
}

export default function TaskDetailPanel({ task, onClose }: Props) {
  return (
    <>
      {task && <div className="fixed inset-0 z-40" onClick={onClose} />}

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[420px] bg-white shadow-[0_15px_50px_-12px_rgba(0,0,0,0.3)] transition-transform duration-300 ${task ? 'translate-x-0' : 'translate-x-full'} `}
      >
        {task && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-6 py-5">
              <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="flex items-center justify-between px-10 pt-10">
              <h2 className="text-xl font-semibold text-gray-900">{task.title}</h2>
              <button className="text-gray-400">⋮</button>
            </div>

            <div className="mt-4 flex items-center gap-3 px-7 pb-4">
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <span className="text-sm text-gray-700">{task.writer?.nickname ?? '작성자'}</span>
            </div>

            <div className="flex items-center justify-between px-6">
              <div className="flex flex-col gap-2">
                <div className="flex gap-6">
                  <MetaItem icon={<IconCalendar size={16} />}>시작 날짜</MetaItem>
                  <p className="font-weight-regular text-txt-primary text-sm">
                    {formatDateTime(task.date)}
                  </p>
                </div>
                <div className="flex gap-6">
                  <MetaItem icon={<IconRepeat />}>반복 설정</MetaItem>
                  <p className="font-weight-regular text-txt-primary text-sm">
                    {recurrenceLabelMap[task.recurrence] ?? task.recurrence}
                  </p>
                </div>
              </div>
              <Button leftIcon={<IconCheck />}>완료하기</Button>
            </div>

            <div className="border-background-tertiary mx-7 mt-5 border-t" />

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <p className="font-weight-regular text-txt-primary text-sm leading-relaxed">
                {task.description}
              </p>

              <div className="mt-14">
                <div className="flex items-center gap-1">
                  <p className="text-2lg text-txt-primary font-bold">댓글</p>
                  <p className="text-2lg text-brand-primary font-bold">{task.commentCount}</p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200" />

                  <Input
                    placeholder="댓글을 달아주세요"
                    className="text-txt-default text-md font-weight-regular border-background-tertiary rounded-none border-x-0 border-t border-b"
                    rightElement={
                      <Button
                        variant="ghost"
                        className="bg-primary h-6 w-6 cursor-pointer rounded-full p-0"
                      >
                        <IconCommentBtn
                          className="bg-icon-primary rounded-full text-white"
                          size={24}
                        />
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
