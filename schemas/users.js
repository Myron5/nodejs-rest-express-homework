const Joi = require('joi');
const { emailRegex, passwordRegex } = require('../constants');

const registerLoginSchema = Joi.object({
  email: Joi.string().empty().pattern(emailRegex).required().messages({
    'string.empty': 'email cannot be empty',
    'string.pattern.base': 'invalid email',
    'any.required': 'missing required email field',
  }),
  password: Joi.string().empty().pattern(passwordRegex).required().messages({
    'string.empty': 'password cannot be empty',
    'string.pattern.base': 'invalid password',
    'any.required': 'missing required password field',
  }),
});

module.exports = {
  registerLoginSchema,
};
