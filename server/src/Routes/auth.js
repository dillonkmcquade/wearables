const { Router } = require("express");
const { signup } = require("../handlers/signup");
const { signin } = require("../handlers/signin");
const { logout } = require("../handlers/logout");
const { auth } = require("../middleware");
const { refreshToken } = require("../handlers/refreshToken");

const authRouter = Router();

authRouter
  .post("/signup", signup)
  .post("/signin", signin)
  .post("/logout", auth, logout)
  .post("/refreshToken", refreshToken);

module.exports = authRouter;
