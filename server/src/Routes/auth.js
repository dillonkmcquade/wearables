const { Router } = require("express");
const { signup } = require("../handlers/signup");
const { signin } = require("../handlers/signin.js");

const authRouter = Router();

authRouter.post("/signup", signup).post("/signin", signin);

module.exports = authRouter;
