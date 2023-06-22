const Joi = require("joi");
const { emailRegex, passwordRegex } = require("../constants");

const registerSchema = Joi.object({
  name: Joi.string().empty().min(3).max(30).required().messages({
    "any.empty": "name cannot be empty",
    "string.min": "name is too short",
    "string.max": "name is too long",
    "any.required": "missing required name field",
  }),
  email: Joi.string().empty().pattern(emailRegex).required().messages({
    "any.empty": "email cannot be empty",
    "string.pattern.base": "invalid email",
    "any.required": "missing required email field",
  }),
  password: Joi.string().empty().pattern(passwordRegex).required().messages({
    "any.empty": "password cannot be empty",
    "string.pattern.base": "invalid password",
    "any.required": "missing required password field",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().empty().pattern(emailRegex).required().messages({
    "any.empty": "email cannot be empty",
    "string.pattern.base": "invalid email",
    "any.required": "missing required email field",
  }),
  password: Joi.string().empty().pattern(passwordRegex).required().messages({
    "any.empty": "password cannot be empty",
    "string.pattern.base": "invalid password",
    "any.required": "missing required password field",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
