const { insertUser } = require("../services/userService");

const postSignup = async (req, res) => {
  await insertUser(req.body);
  return res.status(200).json({ message: "USER_SIGNUP" });
};

module.exports = {
  postSignup,
};
