const createError = require("http-errors");

module.exports.Response = {
  success: async (res, statusCode = 200, message = "Ok", data = {}) => {
    res.status(statusCode).send({
      success: true,
      message,
      data,
    });
  },
  error: async (res, error = new createError.InternalServerError()) => {
    const { message, statusCode } = error;
    res.status(statusCode).send({
      success: false,
      message,
    });
  },
};
