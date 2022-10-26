const { appData } = require("../middlewares/dataSource");
const CustomError = require("../utils/CustomError");
const { v1: uuid } = require("uuid");
const { BOARDTYPE } = require("../config/boardType");

const insertBoard = async (
  userId,
  scope,
  { title, text, accessGrade, type = "FREE" }
) => {
  if (scope === "user") {
    if (type !== "FREE") throw new CustomError(403, "FORBIDDEN");

    const [{ validUser }] = await appData.query(
      `
      SELECT EXISTS(
        SELECT
          *
        FROM user
        WHERE user_id = ?
      ) AS validUser
      `,
      [userId]
    );
    if (validUser !== "1") throw new CustomError(401, "Invalid_user");
  }

  const boardType = BOARDTYPE[type];
  const boardId = uuid();

  await appData.query(
    `
    INSERT INTO board (board_id, user_id, title, text, access_grade, type) VALUES (?);
    `,
    [[boardId, userId, title, text, accessGrade, boardType]]
  );
  return;
};

module.exports = {
  insertBoard,
};
