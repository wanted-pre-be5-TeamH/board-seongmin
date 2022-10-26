const router = require("express").Router();
const { catchAsync } = require("../utils/ErrorHandler");
const { validator } = require("../middlewares");

const { postSignup } = require("../controllers/userController");
const {
  postSignupSchema,
} = require("../middlewares/validation/uservalidation");

router.route("/").post(validator(postSignupSchema), catchAsync(postSignup));

module.exports = router;
