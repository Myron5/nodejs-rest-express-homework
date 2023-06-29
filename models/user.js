const { model } = require('mongoose');
const gravatar = require('gravatar');
const path = require('node:path');

const { userDbSchema } = require('../schemas');
const { fsRename, loadToCloudinary } = require('../helpers');

const User = model('user', userDbSchema);
const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const checkEmail = async email => {
  const isFound = await User.findOne({ email });
  const isUnique = !isFound;
  return isUnique;
};

const addUser = async user => {
  const avatarURL = gravatar.url(user.email);
  const newUser = await User.create({ ...user, avatarURL });
  return newUser;
};

const checkUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  const compared = await user.checkPassword(password);
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

const updateAvatarCloud = async (id, tmpUpload) => {
  const avatarURL = await loadToCloudinary(id, tmpUpload);
  if (!avatarURL) {
    return null;
  }
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
  updateAvatarCloud,
};
