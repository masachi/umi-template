const colorPie = [
  '#FA9716',
  '#B0A6E6',
  '#7562D9',
  '#FFB82B',
  '#FD7062',
  '#8977D9',
];

function getLinebreakFormat(numbers, rowNum, addNum, shakeLabel?) {
  return function (param) {
    if (!param) return param;
    let params = param;
    if (shakeLabel) params = shakeLabel(param);
    var newParamsName = '';
    var paramsNameNumber = params.length;
    var provideNumber = numbers ? numbers : 10;
    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
    var row = rowNum ? rowNum : 3;
    var add = addNum ? addNum : 3;
    if (paramsNameNumber > provideNumber) {
      for (var p = 0; p < rowNumber; p++) {
        var tempStr = '';
        var start = p * provideNumber;
        var end = start + provideNumber;
        if (p === rowNumber - 1) {
          tempStr = params.substring(start, paramsNameNumber);
        } else {
          tempStr = params.substring(start, end) + '\n';
        }
        newParamsName += tempStr;
      }
      if (rowNumber > row) {
        newParamsName =
          newParamsName.slice(0, provideNumber * (row - 1) + add) + '...';
      }
    } else {
      newParamsName = params;
    }
    return newParamsName;
  };
}

function shakedataZoom(node: any[], splitNumber: number = 10) {
  if (node.length > splitNumber) {
    const leng = node.length;
    let endlength: number = parseInt(((splitNumber / leng) * 100) as any);
    if (endlength > 0) {
      return {
        start: 0,
        end: endlength,
      };
    } else {
      return {
        start: 0,
        end: 1,
      };
    }
  } else {
    return {
      start: 0,
      end: 100,
    };
  }
}

export { getLinebreakFormat, shakedataZoom, colorPie };
