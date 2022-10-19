import { File } from 'better-xlsx';
import { saveAs } from 'file-saver';
import max from 'lodash/max';
import dayjs from 'dayjs';

export const DEFAULT_INTENT_STANDARD = 10;

export function exportExcel(
  columns: any[],
  tableDataSource: any[],
  fileName: string,
  exportExcludeIndexes: string[] = [],
) {
  console.error('export start', dayjs().format('YYYY-MM-DD HH:mm:ss'));

  // 新建 工作表
  const file = new File();
  // 新建sheet
  const sheet = file.addSheet('sheet1');

  let columnItemRows = columns.map((columnItem) => {
    return getColumnDepth(columnItem);
  });

  let maximumRowNumber = max(columnItemRows);
  let allExportDataIndexes = getDataIndexes(columns).filter(
    (item) => !exportExcludeIndexes.includes(item) && !!item,
  );

  // 初始化表头行
  for (let index = 0; index < maximumRowNumber; index++) {
    let row = sheet.addRow();
    for (let index = 0; index < allExportDataIndexes.length; index++) {
      row.addCell();
    }
  }
  // 构建表头 header
  calculateColumnItemRowColumnIndex(columns, 0, 0, 0);
  buildExcelColumnHeader(columns);

  // 构建datasource
  let hasIndentColumnIndexes = {};
  flatDataSource(tableDataSource).forEach((dataSourceItem) => {
    let dataRow = sheet.addRow();
    allExportDataIndexes.forEach((key, index) => {
      let columnData = columns.find(
        (columnItem) => columnItem.dataIndex === key,
      );
      let dataCell = dataRow.addCell();
      dataCell.value =
        dataSourceItem[key] === undefined ? '-' : dataSourceItem[key];
      dataCell.style.align.v = 'center';
      // 默认横向在中间
      dataCell.style.align.h = 'center';

      if (dataSourceItem['left'] && columnData?.indent) {
        dataCell.style.align.indent =
          dataSourceItem['left'] / DEFAULT_INTENT_STANDARD;
        dataCell.style.align.h = 'left';

        hasIndentColumnIndexes[index] = Math.max(
          hasIndentColumnIndexes[index] || 0,
          dataSourceItem['left'] / DEFAULT_INTENT_STANDARD,
        );
      }
    });
  });

  // 设定宽度
  for (let i = 0; i < allExportDataIndexes.length; i++) {
    sheet.col(i).width = 15;
  }

  // 带有缩进 给到相对大一点 宽度 同时包含 缩进的列 只要不是horizontal right 全部改为 left
  if (Object.keys(hasIndentColumnIndexes).length > 0) {
    Object.keys(hasIndentColumnIndexes).forEach((index) => {
      let columnIndex = parseInt(index);
      sheet.col(columnIndex).width = 15 + hasIndentColumnIndexes[index] * 2;

      // 修改left
      for (
        let rowIndex = maximumRowNumber;
        rowIndex <= maximumRowNumber + tableDataSource.length;
        rowIndex++
      ) {
        let cell = sheet.cell(rowIndex, columnIndex);
        // TODO 这里还是做个配置项吧
        if (cell.style.align.h !== 'right' && cell.value !== '总计') {
          cell.style.align.h = 'left';
        }
      }
    });
  }

  console.error('export end', dayjs().format('YYYY-MM-DD HH:mm:ss'));

  file.saveAs('blob').then((content: any) => {
    saveAs(content, fileName + '.xlsx');
  });

  // 计算当前column格子的rowIndex， columnIndex，占多少格
  function calculateColumnItemRowColumnIndex(
    columns,
    sheetRowIndex,
    sheetColumnIndex,
    depth,
  ) {
    let latestIndex = sheetColumnIndex;
    let needExportColumns = columns
      .slice()
      .filter(
        (item) =>
          !exportExcludeIndexes.includes(item.dataIndex) && !!item.dataIndex,
      );

    needExportColumns.map((columnItem) => {
      columnItem['rowIndex'] = sheetRowIndex;
      columnItem['columnIndex'] = latestIndex;
      // 纵向
      columnItem['vMerge'] = columnItem?.children
        ? 0
        : maximumRowNumber - depth;
      // 横向
      columnItem['hMerge'] = columnItem?.children
        ? columnItem?.children?.length - 1
        : 0;

      if (columnItem.children && columnItem.children?.length > 0) {
        latestIndex = calculateColumnItemRowColumnIndex(
          columnItem.children,
          columnItem['rowIndex'] + 1,
          columnItem['columnIndex'],
          depth + 1,
        );
      } else {
        latestIndex = columnItem['columnIndex'];
      }

      latestIndex++;
    });

    return needExportColumns[needExportColumns.length - 1].columnIndex;
  }

  function buildExcelColumnHeader(columns) {
    columns
      .filter(
        (item) =>
          !exportExcludeIndexes.includes(item.dataIndex) && !!item.dataIndex,
      )
      .forEach((columnItem) => {
        let currentCell = sheet.cell(
          columnItem['rowIndex'],
          columnItem['columnIndex'],
        );

        currentCell.value = columnItem.title;
        currentCell.style.align.h = 'center';
        currentCell.style.align.v = 'center';

        if (columnItem.hMerge > 0) {
          currentCell.hMerge = columnItem.hMerge;
        }

        if (columnItem.vMerge > 0) {
          currentCell.vMerge = columnItem.vMerge;
        }

        if (columnItem.children && columnItem?.children?.length > 0) {
          buildExcelColumnHeader(columnItem.children.slice());
        }
      });
  }
}

function getColumnDepth(columnItem) {
  return Array.isArray(columnItem.children) &&
    columnItem?.children &&
    columnItem?.children?.length > 0
    ? 1 + Math.max(0, ...columnItem.children?.map(getColumnDepth))
    : 0;
}

function getDataIndexes(columns) {
  let result = [];
  columns.forEach((item) => {
    if (!item.children) {
      result.push(item.dataIndex);
    }
    if (item.children && Array.isArray(item.children)) {
      result = result.concat(getDataIndexes(item.children));
    }
  });

  return result;
}

function flatDataSource(tableDataSource: any[]) {
  let result = [];
  tableDataSource.forEach((item) => {
    result.push(item);
    if (item.childs && Array.isArray(item.childs)) {
      result = result.concat(flatDataSource(item.childs));
    }
  });

  return result;
}
