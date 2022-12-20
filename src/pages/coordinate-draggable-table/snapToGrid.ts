export const ROW_HEIGHT = 60;

export function snapToGrid(x: number, y: number): [number, number] {
  const containerWidth = document.getElementById(
    'coordinate-draggable-table',
  ).offsetWidth;
  const currentCellWidth = containerWidth / 24;

  const snappedX = Math.round(x / currentCellWidth) * currentCellWidth;
  const snappedY = Math.round(y / ROW_HEIGHT) * ROW_HEIGHT;
  return [snappedX, snappedY];
}
