const { appData } = require("../middlewares/dataSource");
const CustomError = require("../utils/CustomError");
const { v1: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { GRADE, TYPE } = require("../config/userType");

const insertUser = async ({
  userName,
  email,
  grade,
  gender,
  age,
  phone,
  password,
  type,
}) => {
  const userType = TYPE[type];
  const [{ valideUser }] = await appData.query(
    `
    SELECT EXISTS(
      SELECT
        *
      FROM user
      WHERE email = ? AND type = ?
    ) AS valideUser
    `,
    [email, userType]
  );

  if (valideUser !== "0") throw new CustomError(409, "ALREADY_EXISTED");

  const userId = uuid();

  const saltRound = 8;
  const bcryptPassword = await bcrypt.hash(password, saltRound);
  const userGrade = GRADE[grade];

  await appData.query(
    `INSERT INTO user (user_id, email, user_name, grade, gender, age, phone, password, type) VALUES (?)`,
    [
      [
        userId,
        email,
        userName,
        userGrade,
        gender,
        age,
        phone,
        bcryptPassword,
        userType,
      ],
    ]
  );
  return;
};

const updateLogin = async ({ email, password }) => {
  const [user] = await appData.query(
    `
    SELECT
      user_id userId,
      grade,
      password,
      type
    FROM user
    WHERE email = ?;
    `,
    [email]
  );

  if (!user) throw new CustomError(404, "Invalid_user");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new CustomError(401, "Invalid_password");

  const secretKey = process.env.SECRETKEY;
  const accessTtl = process.env.ACCESS_TOKEN_TTL;

  const accessPayLoad = {
    exp: Math.floor(Date.now() / 1000) + Number(accessTtl),
    userId: user.userId,
    scope: user.type === 1 ? "user" : "admin",
  };

  return jwt.sign(accessPayLoad, secretKey);
};

module.exports = {
  insertUser,
  updateLogin,
};
