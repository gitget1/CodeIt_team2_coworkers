import { MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';

export function useTaskBoardSensors() {
  return useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } }),
  );
}
