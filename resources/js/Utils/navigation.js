/**
 * @param {string} routeName
 * @param {array} params
 * @returns {string} endpoint named by param routeName
 */
function appRoute(routeName, params) {
  return route(routeName, params, false);
}

export { appRoute };
