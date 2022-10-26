const jwt = require("jsonwebtoken");
const CustomError = require("../utils/CustomError");

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [type, token] = authorization.split(" ");
    if (type.toLowerCase() !== "bearer")
      throw new CustomError(401, "Invalid_token");

    const decoded = await jwt.verify(token, process.env.SECRETKEY);

    if (decoded.exp < Math.floor(Date.now() / 1000))
      throw new CustomError(401, "ACCESS_TOKE_EXPIRED");
    req.body.decoded = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Access Token" });
  }
};

module.exports = {
  validateToken,
};
