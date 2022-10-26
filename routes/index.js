const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");
const boardRouter = require("./boardRoute");

router.get("/ping", (req, res) => {
  console.log("pong");
  res.status(200).json({ message: "pong" });
});

router.use("/user", userRouter);

router.use("/board", boardRouter);

module.exports = router;
