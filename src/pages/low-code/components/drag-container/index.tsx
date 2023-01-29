import React, { useEffect, useState } from 'react';
import './index.less';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import GridLayout from 'react-grid-layout';

interface Props {
  data: any[];
}

const DragContainer = ({ data }: Props) => {
  const [gridWidth, setGridWidth] = useState(0);

  const [itemLayout, setItemLayout] = useState({});

  const [layout, setLayout] = useState([]);

  useEffect(() => {
    if (data && data?.length > 0) {
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
    }
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

  return (
    <div className="drag-container" id={'draggable-table-container'}>
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
                cols={10}
                rowHeight={40}
                width={gridWidth}
                // verticalCompact={false}
                isBounded={true}
                margin={[20, 16]}
                onLayoutChange={(layout, layouts) => {
                  console.info('layout change', layout);

                  let itemLayout = {};
                  layout?.forEach((item) => {
                    itemLayout[item.i] = item;
                  });

                  setItemLayout(itemLayout);
                }}
              >
                {layout.map((item) => {
                  const CurrentComponent = item.data.type;
                  return (
                    <div key={item.i}>
                      <CurrentComponent {...item?.data?.props} />
                    </div>
                  );
                })}
              </GridLayout>
            )}

            {layout.length === 0 && (
              <div className="drag-hint-container">拖动组件到这里</div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DragContainer;
