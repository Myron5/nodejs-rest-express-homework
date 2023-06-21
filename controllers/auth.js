const { addUser } = require("../models/user");
const { ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email, name } = await addUser(req.body);
  res.json({ email, name });
};

module.exports = {
  register: ctrlWrapper(register),
};
