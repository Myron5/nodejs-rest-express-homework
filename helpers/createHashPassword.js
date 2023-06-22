const bcrypt = require("bcrypt");

const createHashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const compareHashPassword = async (password, hash) => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
};

module.exports = {
  createHashPassword,
  compareHashPassword,
};
