import './index.less';
import DragContainer from '@/pages/low-code/components/drag-container';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import ComponentsMenu from '@/pages/low-code/components/components-container';
import { useState } from 'react';
import fields from '@/pages/low-code/components/components-container/basic';
import { v4 as uuidv4 } from 'uuid';

export default function LowCode() {
  const [selectedComponents, setSelectedComponents] = useState([]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    console.log('==> result', result);

    // dropped outside the list
    if (!destination) {
      return;
    }

    // 从source来
    if (source.droppableId === 'items') {
      let currentSelectedComponent = selectedComponents.slice();
      let dropComponent = fields.find(
        (item) => item.type === result.draggableId,
      );
      if (dropComponent) {
        currentSelectedComponent.push({
          i: uuidv4(),
          data: dropComponent,
          x: 0,
          y: 0,
          w: 3,
          h: 2,
        });
      }

      setSelectedComponents(currentSelectedComponent);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={'low-code-container'}>
        <div className={'left-container'}>
          <ComponentsMenu />
        </div>
        <div className={'middle-container'}>
          <DragContainer data={selectedComponents} />
        </div>
        <div className={'right-container'}></div>
      </div>
    </DragDropContext>
  );
}
