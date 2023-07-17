const jwt = require('jsonwebtoken');

const {
  addUser,
  checkUser,
  updateJwtToken,
  updateAvatar,
  updateAvatarCloud,
  setVerified,
  verifyAgain,
} = require('../models/user');
const { HttpError, ctrlWrapper, getBaseURL } = require('../helpers');

const { SECRET_JWT_KEY, EXPIRES_IN } = process.env;

const register = async (req, res) => {
  const [{ email, subscription }, sended] = await addUser(req.body, getBaseURL(req));
  if (!sended) {
    throw HttpError(503, 'Email service is unavailable');
  }
  res.status(201).json({ user: { email, subscription } });
};

const login = async (req, res) => {
  const user = await checkUser(req.body);
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  } else if (user.token) {
    throw HttpError(409, 'Logout first');
  }
  const { _id, email, subscription } = user;
  const token = jwt.sign({ _id }, SECRET_JWT_KEY, { expiresIn: EXPIRES_IN });
  await updateJwtToken(_id, token);
  res.json({ token, user: { email, subscription } });
};

const current = (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  await updateJwtToken(req.user._id, '');
  res.status(204).send();
};

const avatars = async (req, res) => {
  const { _id } = req.user;
  const { path, filename } = req.file;
  const avatarURL = await updateAvatar(_id, path, filename, getBaseURL(req));
  res.json({ avatarURL });
};

const avatarsCloud = async (req, res) => {
  const { _id } = req.user;
  const { path } = req.file;
  const avatarURL = await updateAvatarCloud(_id, path);
  if (!avatarURL) {
    throw HttpError(503, 'Image service is unavailable');
  }
  res.json({ avatarURL });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await setVerified(verificationToken);
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  res.json({ message: 'Verification successful' });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const [virificationMissed, sended] = await verifyAgain(email, getBaseURL(req));
  if (!virificationMissed) {
    throw HttpError(409, 'Verification has already been passed');
  } else if (!sended) {
    throw HttpError(503, 'Email service is unavailable');
  }
  res.json({ message: 'Resended successfully' });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  avatars: ctrlWrapper(avatars),
  avatarsCloud: ctrlWrapper(avatarsCloud),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
