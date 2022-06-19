const bcrypt = require("bcrypt");
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
