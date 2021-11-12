const debug = require("debug")("app:auth");
const httpError = require("http-errors");
const { Response } = require("../common/response");
const User = require("../models/user");

module.exports.auth = async (req, res, next) => {
  let {
    cookies: { token },
  } = req;
  User.findByToken(token, (err, user) => {
    if (err) {
      debug(err);
      Response.error(res);
    }
    if (!user) {
      Response.error(res, new httpError.Unauthorized());
    }
    req.token = token;
    req.user = user;
    next();
  });
};
