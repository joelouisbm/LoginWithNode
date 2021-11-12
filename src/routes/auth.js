const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();
const { auth } = require("../middlewares/auth");

router
  .get("/auth", auth, userController.auth)
  .get("/logout", auth, userController.logout)
  .post("/login", userController.login);

module.exports = router;
