const { checkEmail } = require("../models/user");
const { HttpError } = require("../helpers");

const isUniqueEmail = async (req, _, next) => {
  const { email } = req.body;
  const isUnique = await checkEmail(email);
  if (!isUnique) {
    next(HttpError(404, `${email} has already been registered`));
  }
  next();
};

module.exports = isUniqueEmail;
