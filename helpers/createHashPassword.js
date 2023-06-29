const bcrypt = require('bcrypt');

const createHashPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
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
