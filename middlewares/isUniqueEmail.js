const { listUsers } = require("../models/user");
const { HttpError } = require("../helpers");

const isUniqueEmail = async (req, _, next) => {
  const { email } = req.body;
  const list = await listUsers();
  console.log(list);
  const isInList = list.some((user) => user.email === email);
  if (isInList) {
    next(HttpError(404, `${email} email already registered`));
  }
  next();
};

module.exports = isUniqueEmail;
