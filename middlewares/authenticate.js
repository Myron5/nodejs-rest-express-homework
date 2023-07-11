const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const { SECRET_JWT_KEY } = process.env;

const authenticate = async (req, _, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    next(HttpError(401));
  }

  const { _id = null } = jwt.verify(token, SECRET_JWT_KEY);
  if (!_id) {
    next(HttpError(401));
  }

  const user = await User.findById(_id);
  if (!user || !user.token || user.token !== token) {
    next(HttpError(401));
  }

  if (!user.verify) {
    next(HttpError(403, 'Email not verified'));
  }

  req.user = user;
  next();
};

module.exports = authenticate;
