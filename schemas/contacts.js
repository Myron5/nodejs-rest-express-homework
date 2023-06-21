const Joi = require("joi");
const { phoneRegexOne, phoneRegexTwo, emailRegex } = require("../constants");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "any.required": "missing required name field",
    "string.min": "name is too short",
    "string.max": "name is too long",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "any.required": "missing required email field",
    "string.pattern.base": "invalid email",
  }),
  phone: Joi.string()
    .pattern(phoneRegexOne, phoneRegexTwo)
    .required()
    .messages({
      "any.required": "missing required phone field",
      "string.pattern.base": "phone number is invalid",
    }),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "any.required": "missing fields",
    "string.min": "name is too short",
    "string.max": "name is too long",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "any.required": "missing fields",
    "string.pattern.base": "invalid email",
  }),
  phone: Joi.string()
    .pattern(phoneRegexOne)
    .pattern(phoneRegexTwo)
    .required()
    .messages({
      "any.required": "missing fields",
      "string.pattern.base": "phone number is invalid",
    }),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
    "boolean.base": "value must be a boolean",
  }),
});

module.exports = { addSchema, updateSchema, updateFavoriteSchema };
