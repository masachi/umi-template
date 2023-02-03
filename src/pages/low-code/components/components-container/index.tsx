import React from 'react';
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import fields from '@/pages/low-code/components/components-container/fields/index';
import './index.less';

const ComponentsMenu = () => {
  return (
    <div className="drag-items-container">
      <Droppable droppableId="items" isDropDisabled={true}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {fields.map((item, index) => (
              <Draggable key={item.name} draggableId={item.name} index={index}>
                {(provided, snapshot) => (
                  <>
                    <div
                      className={`drag-item-container ${
                        snapshot.isDragging ? 'dragging' : ''
                      }`}
                      ref={provided.innerRef}
                      isDragging={snapshot.isDragging}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item.name}
                    </div>
                    {snapshot.isDragging && (
                      <div className={'drag-placeholder-item-container'}>
                        {item.name}
                      </div>
                    )}
                  </>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ComponentsMenu;
