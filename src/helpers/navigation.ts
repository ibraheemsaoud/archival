export const replaceRouteParams = (
  route: string,
  params: { [key: string]: string }
) => {
  let result = route;
  Object.keys(params).forEach((key) => {
    result = result.replace(`:${key}`, params[key]);
  });
  return result;
};
