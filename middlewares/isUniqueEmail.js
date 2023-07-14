const { checkEmail } = require("../models/user");
const { HttpError } = require("../helpers");

const isUniqueEmail = async (req, _, next) => {
  const { email } = req.body;
  const isUnique = await checkEmail(email);
  if (!isUnique) {
    next(HttpError(409, "Email in use"));
  }
  next();
};

module.exports = isUniqueEmail;
