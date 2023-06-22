const Joi = require("joi");
const {
  mixToRegexp,
  phoneRegexOne,
  phoneRegexTwo,
  emailRegex,
} = require("../constants");

// Придумав код з flagSchema оскільки це вимога з дз#2, де потрібно для @POST і @PUT
// різні повідомлення. Нічим іншим ці схеми не відрізняються.

// Придумал код с flagSchema, поскольку это требование с дз#2, где требуется для @POST и @PUT
// разные сообщения. Ничем иным эти схемы не отличаются.

const flag = Object.freeze({
  ADD: "add",
  UPDATE: "update",
});

const flagSchema = (flag) => {
  let nameMessage;
  let emailMessage;
  let phoneMessage;

  switch (flag) {
    case flag.ADD:
      nameMessage = "missing required name field";
      emailMessage = "missing required email field";
      phoneMessage = "missing required phone field";
      break;
    case flag.UPDATE:
      nameMessage = "missing fields";
      emailMessage = "missing fields";
      phoneMessage = "missing fields";
      break;
    default:
      return null;
  }

  Joi.object({
    name: Joi.string().empty().min(3).max(20).required().messages({
      "any.empty": "name cannot be empty",
      "string.min": "name is too short",
      "string.max": "name is too long",
      "any.required": nameMessage,
    }),
    email: Joi.string().empty().pattern(emailRegex).required().messages({
      "any.empty": "email cannot be empty",
      "string.pattern.base": "invalid email",
      "any.required": emailMessage,
    }),
    phone: Joi.string()
      .empty()
      .pattern(mixToRegexp(phoneRegexOne, phoneRegexTwo))
      .required()
      .messages({
        "any.empty": "phone cannot be empty",
        "string.pattern.base": "phone number is invalid",
        "any.required": phoneMessage,
      }),
  });
};

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
    "boolean.base": "value must be a boolean",
  }),
});

module.exports = {
  flag,
  flagSchema,
  updateFavoriteSchema,
};
