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
const { HttpError, ctrlWrapper } = require('../helpers');

const { SECRET_JWT_KEY } = process.env;

const register = async (req, res) => {
  const baseURL = `${req.protocol}://${req.get('host')}`;
  const { email, subscription } = await addUser(req.body, baseURL);
  res.status(201).json({ user: { email, subscription } });
};

const login = async (req, res) => {
  const user = await checkUser(req.body);
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const { _id, email, subscription } = user;
  const token = jwt.sign({ _id }, SECRET_JWT_KEY, { expiresIn: '24h' });

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
  const avatarURL = await updateAvatar(_id, path, filename);
  res.json({ avatarURL });
};

const avatarsCloud = async (req, res) => {
  const { _id } = req.user;
  const { path } = req.file;
  const avatarURL = await updateAvatarCloud(_id, path);
  if (!avatarURL) {
    throw HttpError(502);
  }
  res.json({ avatarURL });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await setVerified(verificationToken);
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  res.json({ message: 'Verification successful' });
};

const reverify = async (req, res) => {
  const { email } = req.body;
  const baseURL = `${req.protocol}://${req.get('host')}`;
  const isVerified = await verifyAgain(email, baseURL);
  if (isVerified) {
    throw HttpError(400, 'Verification has already been passed');
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
  verify: ctrlWrapper(verify),
  reverify: ctrlWrapper(reverify),
};
