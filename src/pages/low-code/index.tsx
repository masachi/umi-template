import './index.less';
import DragContainer from '@/pages/low-code/components/drag-container';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import ComponentsMenu from '@/pages/low-code/components/components-container';
import { useEffect, useState } from 'react';
import fields from '@/pages/low-code/components/components-container/fields/index';
import { v4 as uuidv4 } from 'uuid';
import { Emitter, EventConstant } from '@/utils/emitter';
import RightEditor from '@/pages/low-code/components/editor';
import cloneDeep from 'lodash/cloneDeep';

export default function LowCode() {
  const [selectedComponents, setSelectedComponents] = useState([]);

  useEffect(() => {
    Emitter.on(EventConstant.DROPPABLE_CONTAINER_DELETE_CLICK, (deleteId) => {
      let deleteIndex = selectedComponents.findIndex(
        (item) => item.i === deleteId,
      );
      if (deleteIndex > -1) {
        selectedComponents.splice(deleteIndex, 1);
      }

      setSelectedComponents(selectedComponents.slice());
    });

    Emitter.on(EventConstant.RIGHT_CONTAINER_PROPS_CHANGE, (data) => {
      let changedComponent = selectedComponents.find(
        (item) => item.i === data.id,
      );
      if (changedComponent) {
        changedComponent.data.props = Object.assign(
          {},
          changedComponent.data.props,
          data?.props,
        );
        setSelectedComponents(selectedComponents.slice());
      }
    });

    Emitter.on(EventConstant.RIGHT_CONTAINER_CARD_CHANGE, (data) => {
      let changedComponent = selectedComponents.find(
        (item) => item.i === data.id,
      );
      if (changedComponent) {
        changedComponent.data.card = Object.assign(
          {},
          changedComponent.data.card,
          data?.card,
        );
        setSelectedComponents(selectedComponents.slice());
      }
    });

    return () => {
      Emitter.off(EventConstant.DROPPABLE_CONTAINER_DELETE_CLICK);
      Emitter.off(EventConstant.RIGHT_CONTAINER_PROPS_CHANGE);
      Emitter.off(EventConstant.RIGHT_CONTAINER_CARD_CHANGE);
    };
  }, [selectedComponents]);

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
      let dropComponent = cloneDeep(fields).find(
        (item) => item.name === result.draggableId,
      );
      if (dropComponent) {
        currentSelectedComponent.push({
          i: uuidv4(),
          data: dropComponent,
          x: 0,
          y: 0,
          w: 3,
          h: 2,
          ...(dropComponent?.position || {}),
        });
      }

      setSelectedComponents(currentSelectedComponent);
      // Emitter.emit(EventConstant.COMPONENT_DROPPED, currentSelectedComponent)
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={'low-code-container'} id={'low-code-container'}>
        <div className={'left-container'}>
          <ComponentsMenu />
        </div>
        <div className={'middle-container'}>
          <DragContainer data={selectedComponents} />
        </div>
        <div className={'right-container'}>
          <RightEditor />
        </div>
      </div>
    </DragDropContext>
  );
}
