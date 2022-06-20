const userRouter = require("express").Router();
const { registerUser, loginUser } = require("../controllers");
const { check } = require("express-validator");

userRouter.post(
  "/auth/registration",
  [
    check("email", "Incorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorter 12 symbols"
    ).isLength({ min: 3, max: 12 }),
  ],
  registerUser
);

userRouter.post("/auth/login", loginUser);

module.exports = userRouter;
