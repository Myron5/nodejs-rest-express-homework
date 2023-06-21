const { model } = require("mongoose");
const { userDbSchema } = require("../schemas");

const User = model("user", userDbSchema);

const listUsers = async () => {
  return await User.find();
};

const addUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

module.exports = { listUsers, addUser };
