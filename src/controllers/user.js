const createError = require("http-errors");
const debug = require("debug")("app:user.controller");
const { UserService } = require("../services/user");
const { Response } = require("../common/response");
const User = require("../models/user");

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
module.exports.getUsers = async (req, res) => {
  try {
    const { body } = req;
    const { result } = await UserService.find(body);
    Response.success(res, 200, undefined, result);
  } catch (error) {
    debug(error);
    Response.error(res);
  }
};
module.exports.getUser = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    console.log(id);
    if (id == undefined) Response.error(res, new createError.BadRequest());
    const { result } = await UserService.findById({ _id: id });
    if (!result) Response.error(res, new createError.NotFound());
    Response.success(res, 200, `User ${id}`, result);
  } catch (error) {
    debug(error);
    Response.error(res);
  }
};
module.exports.createUser = async (req, res) => {
  try {
    const { body } = req;
    if (body == undefined) Response.error(res, new createError.BadRequest());
    const { result } = await UserService.insertUser(body);
    Response.success(res, 201, undefined, result);
  } catch (error) {
    debug(error);
    Response.error(res);
  }
};
module.exports.updateUser = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  try {
    if (id == undefined || body == {})
      Response.error(res, new createError.BadRequest());
    const { result } = await UserService.updateUser({ _id: id }, body);
    Response.success(res, 200, `User ${id} Updated!`, result);
  } catch (error) {
    debug(error);
    Response.error(res);
  }
};
module.exports.deleteUser = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    if (id == undefined) Response.error(res, new createError.BadRequest());
    const { success } = await UserService.deleteUser({ _id: id });
    Response.success(res, 200, `User ${id} deleted!`, undefined);
  } catch (error) {
    debug(error);
    Response.error(res);
  }
};
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
module.exports.logout = async (req, res) => {
  const {
    user: { _id },
  } = req;
  try {
    await UserService.logout({ _id: _id });
    Response.success(res, 200, "Ok!", { success: true });
  } catch (error) {
    debug(error);
    Response.error(res);
  }
};
module.exports.auth = async (req, res) => {
  const result = await UserService.auth(req.user);
  Response.success(res, 200, "Is auth", result);
};
module.exports.login = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  User.findOne({ email: email }, (err, user) => {
    if (!user) return res.json({ loginSucess: false, message: "Auth fail" });
    // get password and compared
    user.comparePassword(password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSucess: false, message: "Password Incorrect" });
      // generate token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("token", user.token).status(200).json({
          loginSuccess: true,
        });
      });
    });
  });
};
