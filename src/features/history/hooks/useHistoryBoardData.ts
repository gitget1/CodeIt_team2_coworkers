import { useMemo } from 'react';
import { UserTaskHistory } from '@/features/user/model/entities/user.model';
import { formatDateWithDay } from '@/shared/lib/date';

export function useHistoryBoardData(
  historyList: UserTaskHistory[] | undefined,
  selectedCategory: string | null,
) {
  const isEmpty = !historyList || historyList.length === 0;

  const { sliderData, displayData } = useMemo(() => {
    let newSliderData: Record<string, number> = {};
    let nestedGroupedData: Record<string, Record<string, UserTaskHistory[]>> = {};

    if (!historyList || historyList.length === 0) {
      return { sliderData: newSliderData, displayData: nestedGroupedData };
    }
    // 최신 날짜순으로 정렬
    const sortedList = [...historyList].sort((a, b) => {
      const dateA = new Date(a.doneAt || a.date).getTime();
      const dateB = new Date(b.doneAt || b.date).getTime();
      return dateB - dateA; // 내림차순
    });

    // 카테고리 데이터와 날짜,이름별 그룹 생성
    sortedList.forEach((task) => {
      newSliderData[task.name] = (newSliderData[task.name] || 0) + 1;

      const dateHeader = formatDateWithDay(task.date);
      const taskTypeName = task.name;

      if (!nestedGroupedData[dateHeader]) nestedGroupedData[dateHeader] = {};
      if (!nestedGroupedData[dateHeader][taskTypeName]) {
        nestedGroupedData[dateHeader][taskTypeName] = [];
      }
      nestedGroupedData[dateHeader][taskTypeName].push(task);
    });

    //  필터링 적용
    let finalDisplayData = nestedGroupedData;

    if (selectedCategory) {
      finalDisplayData = {};
      Object.entries(nestedGroupedData).forEach(([dateHeader, taskTypeGroups]) => {
        if (taskTypeGroups[selectedCategory]) {
          finalDisplayData[dateHeader] = { [selectedCategory]: taskTypeGroups[selectedCategory] };
        }
      });
    }

    return { sliderData: newSliderData, displayData: finalDisplayData };
  }, [historyList, selectedCategory]);
  return { isEmpty, sliderData, displayData };
}
