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

const checkUser = async (user) => {
  const list = await listUsers();
  const isVerified = list.some(
    ({ email, password }) => user.email === email && user.password === password
  );
  return isVerified;
};

module.exports = { listUsers, addUser, checkUser };
