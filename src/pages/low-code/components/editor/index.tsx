import React, { useEffect, useState } from 'react';
import './index.less';
import { Emitter, EventConstant } from '@/utils/emitter';
import { rightFields } from '@/pages/low-code/components/editor/fields';
import { TablePropsEditor } from '@/pages/low-code/components/editor/props/dataSource';
import { propsMap } from '@/pages/low-code/components/editor/props';

const RightEditor = () => {
  const [selectedComponent, setSelectedComponent] = useState(undefined);

  useEffect(() => {
    Emitter.on(
      EventConstant.DROPPABLE_CONTAINER_ITEM_CLICK,
      (selectedComponent) => {
        setSelectedComponent(selectedComponent);
      },
    );

    return () => {
      Emitter.off(EventConstant.DROPPABLE_CONTAINER_ITEM_CLICK);
    };
  }, []);

  const renderRightFieldsOld = (selectComponentData: any) => {
    return (
      <>
        {selectComponentData?.editor?.map((fieldItem) => {
          if (fieldItem.type === 'Table') {
            return null;
          } else {
            const Field = rightFields[fieldItem.type];
            return (
              <div className={'field-container'}>
                <label>{fieldItem?.name}:</label>
                <Field.component
                  {...fieldItem}
                  value={selectComponentData?.props[fieldItem.key]}
                  onChange={async (event: any) => {
                    let payload = {
                      id: selectedComponent?.i,
                      props: {},
                    };

                    let value = fieldItem.valueProcessor
                      ? await fieldItem.valueProcessor(event)
                      : Field.valueProcessor
                      ? Field.valueProcessor(event)
                      : event;

                    payload.props[fieldItem.key] = value;

                    // 用于propsKey 与key不同的场景
                    if (fieldItem.propsKey) {
                      payload.props[fieldItem.propsKey] =
                        fieldItem.propsValueProcessor
                          ? await fieldItem.propsValueProcessor(value)
                          : value;
                    }

                    Emitter.emit(
                      EventConstant.RIGHT_CONTAINER_PROPS_CHANGE,
                      payload,
                    );
                  }}
                />
              </div>
            );
          }
        })}
      </>
    );
  };

  const PropsComponent = selectedComponent
    ? propsMap[selectedComponent.data?.editor]
    : undefined;

  return (
    <div className={'editor-container'} id={'right-editor-container'}>
      <div className={'editor-content-container'}>
        {selectedComponent && PropsComponent ? (
          <>
            <PropsComponent
              componentId={selectedComponent?.i}
              selectComponentData={selectedComponent?.data}
            />
          </>
        ) : (
          // <TablePropsEditor componentId={selectedComponent?.i} selectComponentData={selectedComponent?.data} />
          <div className={'editor-hint-container'}>
            <span>请在左侧画布中选择节点</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightEditor;
