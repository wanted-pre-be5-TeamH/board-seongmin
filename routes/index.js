const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
  console.log("pong");
  res.status(200).json({ message: "pong" });
});

module.exports = router;
