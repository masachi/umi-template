export default function (initialState: any): any {
  const { userId, role } = initialState;

  // TODO 建议还是扩展 到路由内部的某些权限
  return {
    '/': true,
    '/low-code': true,
    '/table': false,
    '/table/2': false,
    '/table/2/3': false,
    '/draggable-table': false,
    '/static-table': false,
    '/coordinate-table': false,
    '/coordinate-draggable-table': false,
  };
}
