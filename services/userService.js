const { appData } = require("../middlewares/dataSource");
const CustomError = require("../utils/CustomError");
const { v1: uuid } = require("uuid");
const bcrypt = require("bcrypt");

const insertUser = async ({
  userName,
  email,
  grade,
  gender,
  age,
  phone,
  password,
}) => {
  const [{ valideUser }] = await appData.query(
    `
    SELECT EXISTS(
      SELECT
        *
      FROM user
      WHERE email = ?
    ) AS valideUser
    `,
    [email]
  );

  if (valideUser !== "0") throw new CustomError(409, "ALREADY_EXISTED_USER");

  const userId = uuid();

  const saltRound = 8;
  const bcryptPassword = await bcrypt.hash(password, saltRound);

  await appData.query(
    `INSERT INTO user (user_id, email, user_name, grade, gender, age, phone, password) VALUES (?)`,
    [[userId, email, userName, grade, gender, age, phone, bcryptPassword]]
  )
  return;
};

module.exports = {
  insertUser,
};
