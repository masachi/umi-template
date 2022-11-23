import React, { ReactNode } from 'react';
import './index.less';
import { Col, Row, Tooltip } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { valueNullOrUndefinedReturnDash } from '@/utils/utils';

export declare type ItemDataType = 'summary' | 'info';

interface AnalysisSummaryCardProps {
  data?: DataItem[];
}

export interface DataItem {
  id?: string;
  type: ItemDataType;
  dataKeys: string[];

  ratioItems?: CardRatioItem[];

  // type === summary
  label?: string;
  icon?: any;
  value?: string;
  dataType?: string;
  dataScale?: number;
  valueLabel?: string;

  // type === info
  infos?: InfoItem[];
}

interface InfoItem {
  label?: string;
  value?: string;
  dataType?: string;
  dataScale?: number;
  valueLabel?: string;
  style?: object;

  ratioItems?: CardRatioItem[];
}

interface CardRatioItem {
  label: string;
  ratio: number;
}

const SummaryCard = ({ data }: AnalysisSummaryCardProps) => {
  return (
    <div className={'card-container'}>
      {data?.map((dataItem, index) => {
        return (
          <>
            <div key={dataItem?.id} style={{ height: 92 }}>
              {dataItem.type === 'summary' && <SummaryItem {...dataItem} />}
              {dataItem.type === 'info' && <SummaryInfoItem {...dataItem} />}
            </div>
            {index != data?.length - 1 && <div className={'separator'} />}
          </>
        );
      })}
    </div>
  );
};

const SummaryItem = (data: DataItem) => {
  return (
    <>
      <div id={data?.id} className={'summary-item-container'}>
        <div className={'label-container'}>
          {data.icon}
          <span>{data.label}</span>
        </div>

        <div className={'value-container'}>
          <span className={'value'}>
            {valueNullOrUndefinedReturnDash(
              data?.value,
              data?.dataType,
              data?.dataScale,
            )}
          </span>
          {data.value ? <span>{data?.valueLabel}</span> : null}
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

const SummaryInfoItem = (data: DataItem) => {
  return (
    <>
      <div id={data?.id} className={'info-container'}>
        {data?.infos?.map((infoItem) => {
          return (
            <>
              <div className={'info-item-container'}>
                <span className={'label'}>{infoItem.label}</span>
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
