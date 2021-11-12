const express = require("express");
const userController = require("../controllers/user");
const { admin } = require("../middlewares/admin");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router
  .get("/", auth, admin, userController.getUsers)
  .get("/:id", auth, admin, userController.getUser)
  .post("/register", userController.createUser)
  .put("/:id", auth, admin, userController.updateUser)
  .delete("/:id", auth, admin, userController.deleteUser);

module.exports = router;
