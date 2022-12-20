import update from 'immutability-helper';
import type { CSSProperties, FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';

import { DraggableBox } from './DraggableBox';
import type { DragItem } from './interfaces';
import { snapToGrid as doSnapToGrid } from './snapToGrid';
import { box } from 'echarts/types/src/util/layout';

const styles: CSSProperties = {
  width: '100%',
  height: '100%',
  background: '#ffffff',
  position: 'relative',
};

export interface ContainerProps {
  snapToGrid: boolean;
}

interface BoxMap {
  [key: string]: { top: number; left: number; title: string };
}

export const Container: FC<ContainerProps> = ({ snapToGrid }) => {
  const [boxes, setBoxes] = useState<BoxMap>({
    a: { top: 20, left: 80, title: 'Drag me around' },
    b: { top: 180, left: 20, title: 'Drag me too' },
  });

  // TODO 这个有一定bug 需要后续 看一下
  // useEffect(() => {
  //   window.addEventListener('resize', onWindowResize);
  //   return () => window.removeEventListener('resize', onWindowResize);
  // }, [boxes]);

  // const onWindowResize = () => {
  //   Object.keys(boxes).forEach((key) => {
  //     let [left, top] = doSnapToGrid(boxes[key].left, boxes[key].top)
  //     moveBox(key, left, top)
  //   });
  //
  //   global.previousCellWidth = document.getElementById('coordinate-draggable-table').offsetWidth / 24
  // }

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      let currentBoxes = Object.assign({}, boxes);
      currentBoxes[id].top = top;
      currentBoxes[id].left = left;
      setBoxes(currentBoxes);
    },
    [boxes],
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'box',
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as {
          x: number;
          y: number;
        };

        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        if (snapToGrid) {
          [left, top] = doSnapToGrid(left, top);
        }

        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox],
  );

  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => (
        <DraggableBox
          key={key}
          id={key}
          {...(boxes[key] as { top: number; left: number; title: string })}
        />
      ))}
    </div>
  );
};
