export async function getInitialState() {
  return {};
}

export function onRouteChange({ location, routes, action }) {
  // TODO  埋点
}

export const dva = {
  config: {
    initialState: {},
    onError(e: any) {
      console.log(e);
      e.preventDefault();
    },
  },
};
