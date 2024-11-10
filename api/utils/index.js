export const applyMiddleware = (middlewareWrapper, router) => {
  for (const wrapper of middlewareWrapper) {
    wrapper(router);
  }
};
