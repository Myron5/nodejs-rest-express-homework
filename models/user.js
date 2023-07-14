const mongoose = require('mongoose');
const path = require('node:path');

const { userDbSchema } = require('../schemas');
const { Email, Image } = require('../services');

const User = mongoose.model('user', userDbSchema);
const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const checkEmail = async email => {
  const isFound = await User.findOne({ email });
  const isUnique = !isFound;
  return isUnique;
};

const addUser = async (user, baseURL) => {
  const newUser = await User.create(user);
  const url = `${baseURL}/api/users/verify/${newUser.verificationToken}`;

  // *-* Email Service *-*
  const emailService = new Email(newUser.email, url);
  const sended = emailService.sendVerification();

  return [newUser, sended];
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

const updateAvatar = async (id, tmpUpload, filename, baseURL) => {
  const resultUpload = path.join(avatarsDir, filename);

  // *-* Image Service *-*
  const imageService = new Image(tmpUpload);
  await imageService.moveImage(resultUpload);

  const avatarURL = `${baseURL}/avatars/${filename}`;
  await User.findByIdAndUpdate(id, { avatarURL });
  return avatarURL;
};

const updateAvatarCloud = async (id, tmpUpload) => {
  // *-* Image Service *-*
  const imageService = new Image(tmpUpload);
  const avatarURL = await imageService.loadToCloudinary(id);

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
  const user = await User.findOne({ email });
  if (!user) {
    return [true, true]; // Щоб не було витоку інформації
  } else if (user.verify) {
    return [null, null];
  }
  const url = `${baseURL}/api/users/verify/${user.verificationToken}`;

  // *-* Email Service *-*
  const emailService = new Email(email, url);
  const sended = emailService.sendVerification();

  return [true, sended];
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
