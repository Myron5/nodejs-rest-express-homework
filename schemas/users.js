const Joi = require("joi");
const { emailRegex, passwordRegex } = require("../constants");

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "missing required name field",
    "string.min": "name is too short",
    "string.max": "name is too long",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "any.required": "missing required email field",
    "string.pattern.base": "invalid email",
  }),
  password: Joi.string().pattern(passwordRegex).required().messages({
    "any.required": "missing required password field",
    "string.pattern.base": "invalid password",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "any.required": "missing required email field",
    "string.pattern.base": "invalid email",
  }),
  password: Joi.string().pattern(passwordRegex).required().messages({
    "any.required": "missing required password field",
    "string.pattern.base": "invalid password",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
