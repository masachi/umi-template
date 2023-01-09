import React, { ReactNode, useEffect, useState } from 'react';
import './index.less';
import { Col, Row, Tooltip } from 'antd';
import { valueNullOrUndefinedReturnDash } from '@/utils/utils';
import { Emitter, EventConstant } from '@/utils/emitter';
import isEqual from 'lodash/isEqual';

export declare type ItemDataType = 'summary' | 'info';

interface AnalysisSummaryCardProps {
  data?: DataItem[];
  containerClassName?: string;
  defaultSelectedDataTypes?: string[];
  eventName?: string;
}

export interface DataItem {
  id?: string;
  clickable?: boolean;
  type: ItemDataType;
  dataKeys: string[];

  ratioItems?: CardRatioItem[];

  // type === summary
  label?: string;
  suffix?: string;
  icon?: any;
  summaryData?: SummaryDataItem[];

  // type === info
  infos?: InfoItem[];
}

export interface SummaryDataItem {
  value?: string;
  dataType?: string;
  dataScale?: number;
  valueLabel?: string;
}

interface InfoItem {
  label?: string;
  suffix?: string;
  value?: string;
  dataType?: string;
  dataScale?: number;
  valueLabel?: string;
  style?: object;

  clickable?: boolean;

  ratioItems?: CardRatioItem[];
}

interface CardRatioItem {
  label: string;
  ratio: number;
}

const SummaryCard = ({
  data,
  containerClassName,
  defaultSelectedDataTypes,
  eventName,
}: AnalysisSummaryCardProps) => {
  // TODO clickedDataTypes 渲染会不会出现多页面 都接到这个types 导致 重复渲染
  const [clickedDataTypes, setClickedDataTypes] = useState(
    defaultSelectedDataTypes || [],
  );

  useEffect(() => {
    Emitter.on(EventConstant.SUMMARY_CARD_CLICK, (clickedDataTypes) => {
      setClickedDataTypes(clickedDataTypes);
      Emitter.emit(
        eventName || EventConstant.SUMMARY_CARD_CLICK_PARENT,
        clickedDataTypes,
      );
    });
    return () => {
      Emitter.off(EventConstant.SUMMARY_CARD_CLICK);
    };
  }, []);

  return (
    <div
      className={`card-container ${containerClassName} ${
        data?.length === 1 && isEqual(data?.at(0)?.dataKeys, clickedDataTypes)
          ? 'card-selected'
          : ''
      }`}
    >
      {data?.map((dataItem, index) => {
        let clickDataTypes =
          dataItem.dataKeys || dataItem?.infos?.map((item) => item.dataType);

        return (
          <>
            <div
              key={dataItem?.id}
              className={`card-base-container ${
                data?.length > 1 && isEqual(clickDataTypes, clickedDataTypes)
                  ? 'card-selected'
                  : ''
              }`}
            >
              {dataItem.type === 'summary' && (
                <SummaryItem
                  data={dataItem}
                  clickedDataTypes={clickedDataTypes}
                />
              )}
              {dataItem.type === 'info' && (
                <SummaryInfoItem
                  data={dataItem}
                  clickedDataTypes={clickedDataTypes}
                />
              )}
            </div>
            {index != data?.length - 1 && <div className={'separator'} />}
          </>
        );
      })}
    </div>
  );
};

const SummaryItem = ({ data, clickedDataTypes }) => {
  let clickDataTypes = data.dataKeys;

  return (
    <>
      <div
        id={data?.id}
        className={'summary-item-container'}
        style={data.clickable ? { cursor: 'pointer' } : { cursor: 'default' }}
        onClick={() => {
          if (data.clickable) {
            Emitter.emit(
              EventConstant.SUMMARY_CARD_CLICK,
              isEqual(clickDataTypes, clickedDataTypes) ? [] : clickDataTypes,
            );
          }
        }}
      >
        <div className={'label-container'}>
          {data.icon}
          <span>{data.label}</span>
          {data?.suffix && <span>{data.suffix}</span>}
        </div>

        <div className={'values-container'}>
          {
            // 先行写死 说用括号来
            data?.summaryData?.map((item, index) => {
              return (
                <div className={'value-container'}>
                  <span className={'value'}>
                    {index !== 0 && '('}
                    {valueNullOrUndefinedReturnDash(
                      item?.value,
                      item?.dataType,
                      item?.dataScale,
                    )}
                    {index !== 0 && ')'}
                  </span>
                  {item.value ? <span>{item?.valueLabel}</span> : null}
                </div>
              );
            })
          }
        </div>
        {data?.ratioItems && (
          <Row gutter={[16, 16]}>
            <div className={'ratio-compare-container'}>
              {data?.ratioItems.map((ratioItem, index) => {
                return (
                  <Col span={Math.max(6, 24 / data?.ratioItems?.length)}>
                    <div className={'compare-item-container'}>
                      <span className={'ratio-label'}>{ratioItem.label}</span>
                      <div
                        className={`${
                          ratioItem.ratio > 0
                            ? 'increase-icon'
                            : 'decrease-icon'
                        }`}
                      />
                      <span
                        className={`ratio-content ${
                          ratioItem.ratio > 0
                            ? 'increase-color'
                            : 'decrease-color'
                        }`}
                      >
                        {Math.abs(ratioItem.ratio)}
                      </span>
                    </div>
                  </Col>
                );
              })}
            </div>
          </Row>
        )}
      </div>
    </>
  );
};

const SummaryInfoItem = ({ data, clickedDataTypes }) => {
  return (
    <>
      <div id={data?.id} className={'info-container'}>
        {data?.infos?.map((infoItem, index) => {
          let clickDataTypes = [data.dataKeys[index]];

          return (
            <>
              <div
                className={`info-item-container ${
                  isEqual(clickDataTypes, clickedDataTypes)
                    ? 'card-selected'
                    : ''
                }`}
                style={
                  infoItem.clickable
                    ? { cursor: 'pointer' }
                    : { cursor: 'default' }
                }
                onClick={() => {
                  if (infoItem.clickable) {
                    Emitter.emit(
                      EventConstant.SUMMARY_CARD_CLICK,
                      isEqual(clickDataTypes, clickedDataTypes)
                        ? []
                        : clickDataTypes,
                    );
                  }
                }}
              >
                <span className={'label'}>{infoItem.label}</span>
                {infoItem?.suffix && <span>{infoItem.suffix}</span>}
                <span className={'value ellipsis'} style={infoItem?.style}>
                  {valueNullOrUndefinedReturnDash(
                    infoItem?.value,
                    infoItem?.dataType,
                    infoItem?.dataScale,
                  )}
                  {infoItem.value ? <span>{infoItem?.valueLabel}</span> : null}
                </span>
              </div>
            </>
          );
        })}

        {data?.ratioItems && (
          <Row gutter={[16, 16]}>
            <div className={'ratio-compare-container'}>
              {data?.ratioItems.map((ratioItem, index) => {
                return (
                  <Col span={Math.max(6, 24 / data?.ratioItems?.length)}>
                    <div className={'compare-item-container'}>
                      <span className={'ratio-label'}>{ratioItem.label}</span>
                      <div
                        className={`${
                          ratioItem.ratio > 0
                            ? 'increase-icon'
                            : 'decrease-icon'
                        }`}
                      />
                      <span
                        className={`ratio-content ${
                          ratioItem.ratio > 0
                            ? 'increase-color'
                            : 'decrease-color'
                        }`}
                      >
                        {Math.abs(ratioItem.ratio)}
                      </span>
                    </div>
                  </Col>
                );
              })}
            </div>
          </Row>
        )}
      </div>
    </>
  );
};

export default SummaryCard;
