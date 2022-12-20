import type { FC } from 'react';
import { useCallback, useState } from 'react';

import { Container } from './Container';
import { CustomDragLayer } from './CustomDragLayer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Example: FC = () => {
  return (
    <div
      id={'coordinate-draggable-table'}
      style={{ height: '100%', width: '100%' }}
    >
      <Container snapToGrid={true} />
      <CustomDragLayer snapToGrid={true} />
    </div>
  );
};

const DndContainer = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Example />
    </DndProvider>
  );
};

export default DndContainer;
