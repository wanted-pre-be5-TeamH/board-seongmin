const Joi = require("joi");
const CustomError = require("../../utils/CustomError");

const postSignupSchema = Joi.object({
  body: Joi.object({
    userName: Joi.string()
      .required()
      .error(new CustomError(404, "Invalid_user")),
    email: Joi.string()
      .email({ tlds: true })
      .required()
      .error(new CustomError(404, "Invalid_email")),
    grade: Joi.string().required().error(new CustomError(404, "Invalid_grade")),
    gender: Joi.string()
      .valid("M", "F")
      .required()
      .error(new CustomError(404, "Invalid_gender")),
    age: Joi.number()
      .integer()
      .min(1)
      .max(200)
      .required()
      .error(new CustomError(404, "Invalid_age")),
    phone: Joi.string()
      .length(11)
      .required()
      .error(new CustomError(404, "Invalid_phone")),
    password: Joi.string()
      .min(4)
      .max(12)
      .required()
      .error(new CustomError(404, "Invalid_password")),
  }),
}).unknown(true);

module.exports = {
  postSignupSchema,
};
