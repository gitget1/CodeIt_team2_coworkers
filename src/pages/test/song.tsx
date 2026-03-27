import { GlobalLayout } from '@/widgets/layout/GlobalLayout';
import { useState, useEffect } from 'react';
import { MonthSelector } from '@/features/history/components/monthSelector';
import { SummaryCard } from '@/features/history/components/summaryCard';
import { DateGroup } from '@/features/history/components/dateGroup';
import { HistoryTaskItem } from '@/features/history/components/historyTaskItem';

export default function HistoryPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <GlobalLayout>
      <div className="bg-background-secondary min-h-screen w-full py-10">
        <div className="bg-background-primary mx-auto flex w-full max-w-[758px] flex-col rounded-[20px] px-[37px] pt-[33px] pb-[52px]">
          {/*페이지 타이틀 */}
          <h1 className="text-txt-primary mb-8 text-2xl font-bold">마이 히스토리</h1>

          {/* 월 선택 */}
          <div className="mb-6 flex items-center justify-start">
            <MonthSelector currentMonth="2025년 5월" />
          </div>

          {/*히스토리 칩*/}
          <section className="no-scrollbar mb-12 flex w-full gap-3 overflow-x-auto pb-2">
            <SummaryCard title="법인 등기" count={3} isActive={true} />
            <SummaryCard title="변경 등기" count={2} />
            <SummaryCard title="법인 설립" count={5} />
          </section>

          {/* TODO: 히스토리 슬라이더 동작 구현 */}
          <section className="flex flex-col gap-10">
            <DateGroup dateHeader="2026년 3월 9일 (월)">
              <HistoryTaskItem
                id={1}
                name="test2"
                date={new Date('2026-03-09T00:00:00.000Z')}
                frequency="DAILY"
                commentCount={3}
              />
            </DateGroup>

            <DateGroup dateHeader="2026년 3월 7일 (토)">
              <HistoryTaskItem
                id={2}
                name="가구 사기"
                date={new Date('2026-03-07T00:00:00.000Z')}
                frequency="DAILY"
                commentCount={2}
              />
              <HistoryTaskItem
                id={3}
                name="테스트임다"
                date={new Date('2026-03-07T00:00:00.000Z')}
                frequency="DAILY"
                commentCount={0}
              />
            </DateGroup>

            <DateGroup dateHeader="2026년 3월 9일 (토)">
              <HistoryTaskItem
                id={4}
                name="댓글이 없을시에는 comment 없음"
                date={new Date('2026-03-07T00:00:00.000Z')}
                frequency="DAILY"
                commentCount={0}
              />
            </DateGroup>
          </section>
        </div>
      </div>
    </GlobalLayout>
  );
}
