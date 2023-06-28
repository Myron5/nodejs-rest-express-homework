const jwt = require('jsonwebtoken');

const { addUser, checkUser, updateJwtToken, updateAvatar, updateAvatarCloud } = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');

const { SECRET_JWT_KEY } = process.env;

const register = async (req, res) => {
  const { email, subscription } = await addUser(req.body);
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
  const { path: tmpUpload, ext } = req.file;
  const avatarURL = await updateAvatar(_id, tmpUpload, ext);
  res.json({ avatarURL });
};

const avatarsCloud = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload } = req.file;
  const avatarURL = await updateAvatarCloud(_id, tmpUpload);
  if (!avatarURL) {
    throw new HttpError(502);
  }
  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  avatars: ctrlWrapper(avatars),
  avatarsCloud: ctrlWrapper(avatarsCloud),
};
