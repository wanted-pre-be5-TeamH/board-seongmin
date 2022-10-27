const { insertBoard, selectFreeBoard } = require("../services/boardService");

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

module.exports = {
  postBoard,
  getFreeBoard,
};
