const { model } = require('mongoose');
const gravatar = require('gravatar');
const path = require('node:path');

const { userDbSchema } = require('../schemas');
const { createHashPassword, compareHashPassword, fsRename } = require('../helpers');

const User = model('user', userDbSchema);
const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const checkEmail = async email => {
  const isFound = await User.findOne({ email });
  const isUnique = !isFound;
  return isUnique;
};

const addUser = async user => {
  const password = await createHashPassword(user.password);
  const avatarURL = gravatar.url(user.email);
  const newUser = await User.create({ ...user, password, avatarURL });
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

const updateAvatar = async (id, tmpUpload, ext) => {
  const filename = `${id}.${ext}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fsRename(tmpUpload, resultUpload);
  const avatarURL = `/avatars/${filename}`;
  await User.findByIdAndUpdate(id, { avatarURL });
  return avatarURL;
};

module.exports = {
  User,
  checkEmail,
  addUser,
  checkUser,
  updateJwtToken,
  updateAvatar,
};
