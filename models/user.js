const { model } = require("mongoose");
const { userDbSchema } = require("../schemas");
const { createHashPassword, compareHashPassword } = require("../helpers");

const User = model("user", userDbSchema);

const checkEmail = async (email) => {
  const isFound = await User.findOne({ email });
  const isUnique = !isFound;
  return isUnique;
};

const addUser = async (user) => {
  const password = await createHashPassword(user.password);
  const newUser = await User.create({ ...user, password });
  return newUser;
};

const checkUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  const compared = await compareHashPassword(password, user.password);
  if (!user || !compared) {
    return null;
  }
  return user;
};

const updateJwtToken = async (id, token) => {
  await User.findByIdAndUpdate(id, { token });
};

module.exports = {
  User,
  checkEmail,
  addUser,
  checkUser,
  updateJwtToken,
};
