const { listUsers } = require("../models/user");
const { HttpError } = require("../helpers");

const isUniqueEmail = async (req, _, next) => {
  const { email } = req.body;
  const list = await listUsers();
  console.log(list);
  const isInList = list.some(({ userEmail }) => userEmail === email);
  if (isInList) {
    next(HttpError(404, `${email} id already registered`));
  }
  next();
};

module.exports = isUniqueEmail;
