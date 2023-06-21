const { model } = require("mongoose");
const { userDbSchema } = require("../schemas");

const User = model("user", userDbSchema);

// тут будуть методи
const addUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

module.exports = { addUser };
