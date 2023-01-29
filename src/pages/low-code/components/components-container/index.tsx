import React from 'react';
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import fields from '@/pages/low-code/components/components-container/basic';
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
              <Draggable key={item.type} draggableId={item.type} index={index}>
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
                      {item.type}
                    </div>
                    {snapshot.isDragging && (
                      <div className={'drag-placeholder-item-container'}>
                        {item.type}
                      </div>
                    )}
                  </>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ComponentsMenu;
