const jwt = require("jsonwebtoken");
const { addUser, checkUser } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_JWT_KEY } = process.env;

const register = async (req, res) => {
  const { email, subscription } = await addUser(req.body);
  res.status(201).json({ user: { email, subscription } });
};

const login = async (req, res) => {
  const user = await checkUser(req.body);
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const { _id, email, subscription } = user;
  const token = jwt.sign({ _id }, SECRET_JWT_KEY, { expiresIn: "24h" });
  res.json({ token, user: { email, subscription } });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
