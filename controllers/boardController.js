const { insertBoard } = require("../services/boardService");

const postBoard = async (req, res) => {
  const { userId, scope } = req.body.decoded;
  await insertBoard(userId, scope, req.body);
  return res.status(201).json({ message: "CREATED_BOARD" });
};

module.exports = {
  postBoard,
};
