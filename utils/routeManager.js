const { errorWrapper } = require("./errorWrapper");

const createRoute = ({ router, method, path, handler, middlewares }) => {
  router[method](path, ...middlewares, errorWrapper(handler));
};

module.exports = createRoute;
