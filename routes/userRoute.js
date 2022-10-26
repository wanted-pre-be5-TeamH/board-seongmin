const router = require("express").Router();
const { catchAsync } = require("../utils/ErrorHandler");
const { validator } = require("../middlewares");

const { postSignup, postLogin } = require("../controllers/userController");
const {
  postSignupSchema,
  postLoginSchema,
} = require("../middlewares/validation/uservalidation");

router.route("/").post(validator(postSignupSchema), catchAsync(postSignup));
router.route("/login").post(validator(postLoginSchema), catchAsync(postLogin));

module.exports = router;
