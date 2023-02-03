import React, { useEffect, useState } from 'react';
import './index.less';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import GridLayout from 'react-grid-layout';
import { Emitter, EventConstant } from '@/utils/emitter';
import { Card } from 'antd';

interface Props {
  data: any[];
}

const DragContainer = ({ data }: Props) => {
  const [gridWidth, setGridWidth] = useState(0);

  const [itemLayout, setItemLayout] = useState({});

  const [layout, setLayout] = useState([]);

  const [currentSelectedId, setCurrentSelectedId] = useState(undefined);

  const [layoutDragging, setLayoutDragging] = useState(false);

  useEffect(() => {
    let dataToItemLayout = Object.assign({}, itemLayout);
    setLayout(
      data.map((item) => {
        if (dataToItemLayout[item.i]) {
          return {
            ...item,
            ...dataToItemLayout[item.i],
          };
        } else {
          dataToItemLayout[item.i] = {
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
          };
        }

        return item;
      }),
    );

    setItemLayout(dataToItemLayout);
  }, [data]);

  useEffect(() => {
    setGridWidth(
      document.getElementById('draggable-table-container')?.offsetWidth - 20,
    );

    window.addEventListener('resize', () => {
      setGridWidth(
        document.getElementById('draggable-table-container')?.offsetWidth - 20,
      );
    });

    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  const handleFocus = (e, currentId) => {
    e.stopPropagation();

    if (layoutDragging) {
      return;
    }

    // 用于判定 是不是内层点击
    // TODO 理论上这里内层点击都是要禁止的
    if (e.currentTarget !== e.target) {
      return;
    }

    let selectedId = currentSelectedId === currentId ? '' : currentId;

    console.error('body container click', selectedId);

    if (selectedId) {
      let currentSelectComponent = layout.find((item) => item.i === selectedId);
      if (currentSelectComponent) {
        Emitter.emit(
          EventConstant.DROPPABLE_CONTAINER_ITEM_CLICK,
          currentSelectComponent,
        );
      }
    }

    setCurrentSelectedId(selectedId);
  };

  const onComponentDeleteClick = (event) => {
    event.stopPropagation();
    setCurrentSelectedId('');
    Emitter.emit(
      EventConstant.DROPPABLE_CONTAINER_DELETE_CLICK,
      currentSelectedId,
    );
    resetRightContainer();
  };

  const onContainerClick = (event) => {
    event.stopPropagation();

    console.error('container click');

    setCurrentSelectedId('');
    resetRightContainer();
  };

  const resetRightContainer = () => {
    // 重置 右侧栏位
    Emitter.emit(EventConstant.DROPPABLE_CONTAINER_ITEM_CLICK, undefined);
  };

  const deleteAction = (
    <span className="icon-container" onClick={onComponentDeleteClick}>
      <svg
        className="icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </span>
  );

  return (
    <div
      className="drag-container"
      id={'draggable-table-container'}
      onClick={onContainerClick}
    >
      <Droppable
        droppableId="board"
        ignoreContainerClipping={false}
        isCombineEnabled={true}
      >
        {(provided: DroppableProvided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {layout.length !== 0 && (
              <GridLayout
                className="layout"
                style={{ height: '100%' }}
                layout={layout}
                cols={24}
                rowHeight={40}
                width={gridWidth}
                // verticalCompact={false}
                isBounded={true}
                margin={[20, 16]}
                onDrag={() => {
                  console.error('dragging');
                  setCurrentSelectedId('');
                  resetRightContainer();
                  setLayoutDragging(true);
                }}
                onDragStop={() => {
                  setTimeout(() => {
                    console.error('dragging stop');
                    setLayoutDragging(false);
                  }, 100);
                }}
                onLayoutChange={(layout, layouts) => {
                  console.info('layout change', layout);

                  let itemLayout = {};
                  layout?.forEach((item) => {
                    itemLayout[item.i] = item;
                  });

                  setItemLayout(itemLayout);
                }}
                draggableHandle=".ant-card-head"
              >
                {layout.map((item) => {
                  const CurrentComponent = item.data.type;
                  // style
                  let componentStyle = {
                    ...(item?.data?.props || {}),
                    cursor: 'default',
                  };
                  if (item?.data?.props?.width) {
                    componentStyle.width = item?.data?.props?.width;
                  }

                  if (item?.data?.props?.height) {
                    componentStyle.height = item?.data?.props?.height;
                  }

                  return (
                    <div
                      className={`${
                        currentSelectedId === item.i ? 'grid-item-selected' : ''
                      }`}
                      key={item.i}
                    >
                      {currentSelectedId === item.i && (
                        <div className={'actions-container'}>
                          {deleteAction}
                        </div>
                      )}
                      <Card
                        className={'card-container'}
                        title={item.data.cardTitle}
                      >
                        <div
                          className={'body-container'}
                          onClick={(event) => {
                            handleFocus(event, item.i);
                          }}
                        >
                          <CurrentComponent
                            style={componentStyle}
                            {...item?.data?.props}
                          />
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </GridLayout>
            )}

            {layout.length === 0 && (
              <div className="drag-hint-container">拖动组件到这里</div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DragContainer;
