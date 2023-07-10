const { User } = require('../models/user');
const { HttpError } = require('../helpers');

const isVerifiedEmail = async (req, _, next) => {
  const { email } = req.body;
  const user = await User.findOne(email);
  if (!user.verify) {
    next(HttpError(403, 'Email not verified'));
  }
  next();
};

module.exports = isVerifiedEmail;
