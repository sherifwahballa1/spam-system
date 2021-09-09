const joi = require("joi");

const resovleSpam = {
  ticketState: joi
    .string()
    .required()
    .trim()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      "string.base": `ticketState must be consists of letters only`,
      "string.pattern.base": `ticketState must be consists of letters only`,
      "string.empty": `ticketState cannot be an empty field`,
      "any.required": `ticketState is required`,
    }),
};

module.exports = {
  resovle: joi.object(resovleSpam),
};
