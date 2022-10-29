const Joi = require("joi");
const CustomError = require("../../utils/CustomError");

const postBoardSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().required().error(new CustomError(404, "Invalid_title")),
    text: Joi.string().required().error(new CustomError(404, "Invalid_text")),
    accessGrade: Joi.string()
      .valid("all", "begginer", "senior")
      .required()
      .error(new CustomError(404, "Invalid_Access_Grade")),
    type: Joi.string()
      .valid("FREE", "NOTICE", "ADMIN")
      .error(new CustomError(404, "Invalid_type")),
  }),
}).unknown(true);

const getAdminBoardSchema = Joi.object({
  body: Joi.object({
    decoded: Joi.object({
      scope: Joi.string()
        .valid("admin")
        .required()
        .error(new CustomError(403, "FORBIDDEN")),
    }).unknown(true),
  }),
}).unknown(true);

module.exports = {
  postBoardSchema,
  getAdminBoardSchema,
};
