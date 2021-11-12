module.exports.initRoutes = (app) => {
  app.use("/user", require("./user"));
  app.use("/account", require("./auth"));
};
