const {
  insertBoard,
  selectFreeBoard,
  selectNotice,
} = require("../services/boardService");

const postBoard = async (req, res) => {
  const { userId, scope } = req.body.decoded;
  await insertBoard(userId, scope, req.body);
  return res.status(201).json({ message: "CREATED_BOARD" });
};

const getFreeBoard = async (req, res) => {
  const { userId } = req.body.decoded;
  const boards = await selectFreeBoard(userId);
  return res.status(200).json(boards);
};

const getNotice = async (req, res) => {
  const notices = await selectNotice();
  return res.status(200).json(notices);
};

module.exports = {
  postBoard,
  getFreeBoard,
  getNotice,
};
