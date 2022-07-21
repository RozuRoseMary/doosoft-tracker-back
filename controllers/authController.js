const { genToken } = require("../services/authService");
const bcrypt = require("bcryptjs");
const createError = require("../services/createError");
const { User } = require("../models");

exports.register = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email) {
      createError("Email is required.", 400);
    }

    if (!password) {
      createError("Password is required.", 400);
    }

    if (password !== confirmPassword) {
      createError("Password not match with confirm password.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 15);
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    const token = genToken({ id: user.id });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      createError("Invalid credential", 400);
    }

    const token = genToken({ id: user.id });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    res.json({ message: "Update profile success." });
  } catch (err) {
    next(err);
  }
};
