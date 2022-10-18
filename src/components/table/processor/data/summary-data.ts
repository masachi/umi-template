export function processSummaryData(
  tableDataSource: any[],
  summaryDataIndex: string,
  summaryData?: any,
  summaryExcludeKeys?: string[],
) {
  let summaryDataItem = summaryData || {};
  let excludeKeys = [...(summaryExcludeKeys || []), summaryDataIndex];

  if (!summaryData) {
    summaryDataItem[summaryDataIndex] = '总计';
    Object.keys(tableDataSource[0])
      .filter((key) => !excludeKeys.includes(key))
      .forEach((key) => {
        summaryDataItem[key] = tableDataSource.reduce(
          (total, currentItem) => total + (currentItem[key] || 0),
          0,
        );
      });
  }

  tableDataSource.unshift(summaryDataItem);

  return tableDataSource.slice();
}
