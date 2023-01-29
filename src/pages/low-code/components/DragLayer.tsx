import { useDragLayer } from 'react-dnd';
import './index.less';

import React, { ReactElement } from 'react';

interface Props {}

export default function DragLayer({}: Props): ReactElement | null {
  const { item, isDragging, clientOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
  }));

  if (!isDragging || !clientOffset) return null;

  return (
    <div className="drag-layer-container">
      <div
        className="layer"
        style={{
          transform: `translate(${clientOffset.x - 10}px, ${
            clientOffset.y - 10
          }px)`,
        }}
      >
        {item.data.type}
      </div>
    </div>
  );
}
