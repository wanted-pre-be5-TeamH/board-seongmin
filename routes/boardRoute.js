const router = require("express").Router();
const { catchAsync } = require("../utils/ErrorHandler");
const { validator } = require("../middlewares");
const { validateToken } = require("../middlewares/auth");

const { postBoard, getFreeBoard } = require("../controllers/boardController");
const {
  postBoardSchema,
} = require("../middlewares/validation/boardValidation");

router
  .route("/")
  .post(validator(postBoardSchema), validateToken, catchAsync(postBoard));

router.route("/freeboard").get(validateToken, catchAsync(getFreeBoard));

module.exports = router;
