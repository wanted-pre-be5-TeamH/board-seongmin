const { insertUser, updateLogin } = require("../services/userService");

const postSignup = async (req, res) => {
  await insertUser(req.body);
  return res.status(200).json({ message: "USER_SIGNUP" });
};

const postLogin = async (req, res) => {
  const accessToken = await updateLogin(req.body);
  return res.status(200).json({ accessToken });
};

module.exports = {
  postSignup,
  postLogin,
};
