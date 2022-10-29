const { appData } = require("../middlewares/dataSource");
const CustomError = require("../utils/CustomError");
const { v1: uuid } = require("uuid");
const { BOARDTYPE } = require("../config/boardType");
const { GRADE } = require("../config/userType");

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
  const boardGrade = GRADE[accessGrade];
  await appData.query(
    `
    INSERT INTO board (board_id, user_id, title, text, access_grade, type) VALUES (?);
    `,
    [[boardId, userId, title, text, boardGrade, boardType]]
  );
  return;
};

const selectFreeBoard = async (userId) => {
  //회원의 등급 조회
  const [{ grade }] = await appData.query(
    `
    SELECT 
      grade
    FROM user
    WHERE user_id = ?
    `,
    [userId]
  );

  const board = await appData.query(
    `
  SELECT
    board_id boardId,
    title,
    text,
    type,
    created,
    access_grade accessGrade
  FROM board
  WHERE access_grade <= ? AND type = 1
  `,
    [grade]
  );
  return board;
};

const selectNotice = async () => {
  const noticeType = BOARDTYPE["NOTICE"];
  return await appData.query(
    `
    SELECT
      board_id noticeId,
      title,
      text,
      type,
      created
    FROM board
    WHERE type = ?
    `,
    [noticeType]
  );
};

module.exports = {
  insertBoard,
  selectFreeBoard,
  selectNotice,
};
