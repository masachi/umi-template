export default function (initialState: any): any {
  const { userId, role } = initialState;

  // TODO 建议还是扩展 到路由内部的某些权限
  return {
    '/': true,
    '/table': true,
  };
}
