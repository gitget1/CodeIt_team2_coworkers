import type { CollisionDetection } from '@dnd-kit/core';
import { closestCorners, pointerWithin } from '@dnd-kit/core';

const COLUMN_ID_PREFIX = 'task-board-column:';

function isColumnDroppableId(id: string): boolean {
  return id.startsWith(COLUMN_ID_PREFIX);
}

/** 빈 컬럼·카드 겹침에서 컬럼↔카드 타깃이 튀지 않게 카드 우선 */
export const taskBoardCollisionDetection: CollisionDetection = (args) => {
  const { droppableRects } = args;
  const pointerHits = pointerWithin(args);
  const cardHits = pointerHits.filter((c) => !isColumnDroppableId(String(c.id)));

  if (cardHits.length > 0) {
    const sorted = [...cardHits].sort((a, b) => {
      const ra = droppableRects.get(String(a.id));
      const rb = droppableRects.get(String(b.id));
      const areaA = ra ? ra.width * ra.height : Number.POSITIVE_INFINITY;
      const areaB = rb ? rb.width * rb.height : Number.POSITIVE_INFINITY;
      return areaA - areaB;
    });
    return [sorted[0]];
  }

  return closestCorners(args);
};
