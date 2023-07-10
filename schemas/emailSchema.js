const Joi = require('joi');

const emailSchema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': 'missing required field email',
    'any.empty': 'email cannot be empty',
  }),
});

module.exports = emailSchema;
