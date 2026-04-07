import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { format, addMonths } from 'date-fns';
import { MonthSelector } from '../components/monthSelector';
import { SummaryCard } from '../components/summaryCard';
import { DateGroup } from '../components/dateGroup';
import { HistoryTaskItem } from '../components/historyTaskItem';
import { HistoryEmptyState } from '../components/HistoryEmptyState';
import { useGetUserHistory } from '@/features/user/hooks/useGetUserHistory';
import { cn } from '@/shared/lib/cn';
import { useHistoryBoardData } from '../hooks/useHistoryBoardData';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

interface HistoryBoardProps {
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>; // useState상위로 넘길떄
  currentGroupId?: string;
}

export function HistoryBoard({
  selectedCategory,
  setSelectedCategory,
  currentGroupId,
}: HistoryBoardProps) {
  const [isClient, setIsClient] = useState(false);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  const [currentDate, setCurrentDate] = useState(new Date());

  const isViewAllForMonth = selectedCategory === null;
  const handleViewAllForMonth = () => {
    setSelectedCategory(null);
  };

  const handleChangeMonth = (amount: number) => {
    setCurrentDate((prev) => addMonths(prev, amount));
    setSelectedCategory(null);
  };

  const currentMonthString = format(currentDate, 'yyyy년 M월');
  const { data: historyList, isLoading: isHistoryLoading } = useGetUserHistory(currentGroupId);

  const filteredHistoryList = useMemo(() => {
    if (!historyList) return [];

    return historyList.filter((task) => {
      const targetDate = task.doneAt || task.date;
      return (
        targetDate.getFullYear() === currentDate.getFullYear() &&
        targetDate.getMonth() === currentDate.getMonth()
      );
    });
  }, [historyList, currentDate]);

  // 필터링된 리스트
  const { isEmpty, sliderData, displayData } = useHistoryBoardData(
    filteredHistoryList,
    selectedCategory,
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={cn(
        'bg-background-primary flex min-h-150 flex-col rounded-[20px]',
        'min-h-165.5 md:min-h-230 xl:min-h-192',
        'w-full max-w-85.75 md:max-w-155 xl:max-w-280',
        'mx-auto xl:mx-0',
        'px-4 py-8 md:px-9.25 md:pt-8.25 md:pb-13',
      )}
    >
      <div className="mb-6 flex items-center justify-center">
        <MonthSelector
          currentMonth={currentMonthString}
          isViewAll={isViewAllForMonth}
          onPrevious={() => handleChangeMonth(-1)}
          onNext={() => handleChangeMonth(1)}
          onToggleViewAll={handleViewAllForMonth}
        />
      </div>
      {!isClient || isHistoryLoading ? (
        <div className="flex w-full flex-col">
          <div className="mb-12 overflow-hidden">
            <div className="flex gap-3 pb-2">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton key={item} className="h-7 w-20 shrink-0 rounded-full md:h-9 md:w-30" />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {[1, 2].map((group) => (
              <div key={group} className="flex flex-col gap-4">
                <div className="flex items-center py-2">
                  <div className="border-brand-secondary grow border-t-2 opacity-30"></div>
                  <Skeleton className="mx-4 h-5 w-28 rounded-md md:h-6 md:w-32" />
                  <div className="border-brand-secondary grow border-t-2 opacity-30"></div>
                </div>

                <ul className="flex flex-col gap-2">
                  <li className="flex flex-col gap-4">
                    <Skeleton className="mt-2 h-5 w-20 rounded-md md:h-6 md:w-24" />

                    <ul className="flex flex-col gap-2">
                      {[1, 2].map((item) => (
                        <Skeleton key={item} className="h-15 w-full rounded-lg md:h-16" />
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : isEmpty ? (
        <div className="mt-12 flex-1">
          <HistoryEmptyState />
        </div>
      ) : (
        <>
          <div ref={scrollWrapperRef} className="mb-12 overflow-hidden">
            <motion.section
              drag="x"
              dragConstraints={scrollWrapperRef}
              dragElastic={0.1}
              className="no-scrollbar flex w-max cursor-grab gap-3 pb-2 active:cursor-grabbing"
            >
              {Object.entries(sliderData).map(([title, count]) => (
                <SummaryCard
                  key={title}
                  title={title}
                  count={count}
                  isActive={selectedCategory === title}
                  onClick={() => setSelectedCategory((prev) => (prev === title ? null : title))}
                />
              ))}
            </motion.section>
          </div>

          <section className="flex flex-col gap-8">
            {Object.entries(displayData).map(([dateHeader, taskTypeGroups]) => (
              <DateGroup key={dateHeader} dateHeader={dateHeader}>
                {Object.entries(taskTypeGroups).map(([taskTypeName, tasks]) => (
                  <li key={taskTypeName} className="flex flex-col gap-4">
                    <h2 className={cn('text-txt-primary text-md pt-2 font-bold md:text-lg')}>
                      {taskTypeName}
                    </h2>
                    <ul className="flex flex-col gap-2">
                      {tasks.map((task) => (
                        <HistoryTaskItem
                          key={task.id}
                          id={task.id}
                          name={task.name}
                          date={task.date}
                          frequency={task.frequency}
                        />
                      ))}
                    </ul>
                  </li>
                ))}
              </DateGroup>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
