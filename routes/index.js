const configs = require('../configs');
const apiVersion = configs.server.API_VERSION;

module.exports = function (app) {
  app.use(`${apiVersion}/users`, require("./userRouter"));
  app.use(`${apiVersion}/departments`, require("./departmentRouter"));
};

