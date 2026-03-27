import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

export function useTaskBoardSensors() {
  return useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
}
