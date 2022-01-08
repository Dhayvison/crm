/**
 * @param {string} routeName
 * @returns {string} endpoint named by param routeName
 */
function endpoint(routeName, params) {
  if (process.env.APP_ENV === 'production') {
    return route(routeName, params, false);
  }
  return route(routeName, params);
}

export { endpoint };
