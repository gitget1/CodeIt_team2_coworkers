import type { ClientRect, CollisionDetection, DroppableContainer, UniqueIdentifier } from '@dnd-kit/core';
import { closestCorners } from '@dnd-kit/core';

const COLUMN_ID_PREFIX = 'task-board-column:';

function isColumnDroppableId(id: string): boolean {
  return id.startsWith(COLUMN_ID_PREFIX);
}

function isPointInRect(
  point: { x: number; y: number },
  rect: { left: number; top: number; width: number; height: number },
): boolean {
  return (
    point.x >= rect.left &&
    point.x <= rect.left + rect.width &&
    point.y >= rect.top &&
    point.y <= rect.top + rect.height
  );
}

function distanceSquaredToRectCenter(
  pointer: { x: number; y: number },
  rect: { left: number; top: number; width: number; height: number },
): number {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = pointer.x - cx;
  const dy = pointer.y - cy;
  return dx * dx + dy * dy;
}

function verticalDistanceToRect(pointerY: number, rect: { top: number; height: number }): number {
  const bottom = rect.top + rect.height;
  if (pointerY < rect.top) return rect.top - pointerY;
  if (pointerY > bottom) return pointerY - bottom;
  return 0;
}

function getColumnStatusFromData(container: DroppableContainer): string | null {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  return (container.data?.current as any)?.columnStatus ?? null;
}

type Entry = { id: UniqueIdentifier; rect: ClientRect };

/**
 * 1. 포인터 좌표로 타겟 컬럼을 먼저 확정
 * 2. data.columnStatus로 그 컬럼에 속하는 카드만 필터 (CSS transform 영향 없음)
 * 3. 그 카드 중 포인터 직접 히트 → 반환
 * 4. 모든 카드 아래 빈 공간 → 컬럼 반환 (맨 뒤 삽입)
 * 5. 카드 사이 gap → 가장 가까운 카드 반환
 * 6. 빈 컬럼 → 컬럼 반환
 */
export const taskBoardCollisionDetection: CollisionDetection = (args) => {
  const { active, droppableContainers, droppableRects, pointerCoordinates } = args;
  const activeId = String(active.id);

  if (!pointerCoordinates) return closestCorners(args);

  type ColumnEntry = Entry & { status: string };
  const columns: ColumnEntry[] = [];
  const cardsByColumnStatus = new Map<string, Entry[]>();
  const cardContainerMap = new Map<string, DroppableContainer>();

  for (const container of droppableContainers) {
    const id = String(container.id);
    const rect = droppableRects.get(container.id);
    if (!rect) continue;

    if (isColumnDroppableId(id)) {
      const colStatus = getColumnStatusFromData(container) ?? id.replace(COLUMN_ID_PREFIX, '');
      columns.push({ id: container.id, rect, status: colStatus });
    } else if (id !== activeId) {
      cardContainerMap.set(id, container);
      const cardColStatus = getColumnStatusFromData(container);
      if (cardColStatus) {
        const list = cardsByColumnStatus.get(cardColStatus) ?? [];
        list.push({ id: container.id, rect });
        cardsByColumnStatus.set(cardColStatus, list);
      }
    }
  }

  let targetColumn =
    columns.find((col) => isPointInRect(pointerCoordinates, col.rect)) ?? null;

  if (!targetColumn && columns.length > 0) {
    targetColumn = columns.reduce((best, col) => {
      const bestDist = distanceSquaredToRectCenter(pointerCoordinates, best.rect);
      const colDist = distanceSquaredToRectCenter(pointerCoordinates, col.rect);
      return colDist < bestDist ? col : best;
    });
  }

  if (!targetColumn) return closestCorners(args);

  const cardsInColumn = cardsByColumnStatus.get(targetColumn.status) ?? [];

  if (cardsInColumn.length === 0) {
    return [{ id: targetColumn.id }];
  }

  const directHits = cardsInColumn.filter((c) => isPointInRect(pointerCoordinates, c.rect));
  if (directHits.length > 0) {
    directHits.sort(
      (a, b) =>
        distanceSquaredToRectCenter(pointerCoordinates, a.rect) -
        distanceSquaredToRectCenter(pointerCoordinates, b.rect),
    );
    return [{ id: directHits[0].id }];
  }

  const bottomMostEdge = Math.max(...cardsInColumn.map((c) => c.rect.top + c.rect.height));
  if (pointerCoordinates.y > bottomMostEdge) {
    return [{ id: targetColumn.id }];
  }

  const nearest = cardsInColumn.reduce((best, card) => {
    const d = verticalDistanceToRect(pointerCoordinates.y, card.rect);
    const bd = verticalDistanceToRect(pointerCoordinates.y, best.rect);
    return d < bd ? card : best;
  });

  return [{ id: nearest.id }];
};
