const createError = require("../services/createError");

exports.getUser = async (req, res, next) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { profileImage, profilePublicId } = req.body;

    console.log(req.file);

    res.json({ message: "Update profile success." });
  } catch (err) {
    next(err);
  }
};
