const userRouter = require("express").Router();
const { registerUser } = require("../controllers");
const { check } = require("express-validator");

userRouter.post(
  "/registration",
  [
    check("email", "Incorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorter 12 symbols"
    ).isLength({ min: 3, max: 12 }),
  ],
  registerUser
);

module.exports = userRouter;