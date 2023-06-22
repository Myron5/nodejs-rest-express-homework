const { addUser, checkUser } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email, name } = await addUser(req.body);
  res.json({ email, name });
};

const login = async (req, res) => {
  const isVerified = await checkUser(req.body);
  if (!isVerified) {
    throw HttpError(401);
  }
  res.json({ isVerified });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
