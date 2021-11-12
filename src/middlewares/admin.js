const { Response } = require("../common/response");
const httpError = require("http-errors");

module.exports.admin = (req, res, next) => {
  const {
    user: { role },
  } = req;
  if (role === 0) {
    Response.error(res, new httpError.Forbidden());
  }
  next();
};
