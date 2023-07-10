const mongoose = require('mongoose');
const path = require('node:path');

const { userDbSchema } = require('../schemas');
const { moveImage, loadToCloudinary } = require('../helpers');
const Email = require('../services/emailService');

const User = mongoose.model('user', userDbSchema);
const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const checkEmail = async email => {
  const isFound = await User.findOne({ email });
  const isUnique = !isFound;
  return isUnique;
};

const addUser = async (user, baseURL) => {
  const newUser = await User.create(user);
  // Sending email verification
  const url = `${baseURL}/api/users/verify/${newUser.verificationToken}`;
  const emailService = new Email(newUser.email, url);
  emailService.sendVerification();
  // -------------------------
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

const updateAvatar = async (id, tmpUpload, filename) => {
  const resultUpload = path.join(avatarsDir, filename);
  await moveImage(tmpUpload, resultUpload);
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

const setVerified = async verificationToken => {
  return await User.findOneAndUpdate({ verificationToken }, { verificationToken: null, verify: true });
};

const verifyAgain = async (email, baseURL) => {
  const { verify, verificationToken } = await User.findOne({ email });
  if (!verify) {
    // Sending email verification
    const url = `${baseURL}/api/users/verify/${verificationToken}`;
    const emailService = new Email(email, url);
    emailService.sendVerification();
    // -------------------------
  }
  return verify;
};

module.exports = {
  User,
  checkEmail,
  addUser,
  checkUser,
  updateJwtToken,
  updateAvatar,
  updateAvatarCloud,
  setVerified,
  verifyAgain,
};
