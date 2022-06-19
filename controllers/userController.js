const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models");
const { validationResult } = require("express-validator");

exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Incorrect request", errors });
    }
    const { email, password } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      return res
        .status(400)
        .json({ message: `User with email ${email} already exist` });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashPassword,
    });

    res.json({ message: "User was created" });
  } catch (err) {
    console.log(err);
    res.send({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, config.get("secretKey"), {
      expiresIn: "13h",
    });

    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.log(err);
    res.send({ message: "Server error" });
  }
};
