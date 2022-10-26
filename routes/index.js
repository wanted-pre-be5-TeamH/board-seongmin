const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");

router.get("/ping", (req, res) => {
  console.log("pong");
  res.status(200).json({ message: "pong" });
});

router.use("/user", userRouter);

module.exports = router;
