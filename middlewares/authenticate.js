const jwt = require('jsonwebtoken');

const { User } = require('../models/user');
const { HttpError } = require('../helpers');

const { SECRET_JWT_KEY } = process.env;

/**
 * Wrapper for authenticate middleware
 */
const wrapper = authenticate => {
  const func = async (req, _, next) => {
    try {
      await authenticate(req, _, next);
    } catch (error) {
      if (!error.message || !error.status) next(HttpError(401));
      else next(error);
    }
  };

  return func;
};

/**
 *  Authenticate middleware
 */
const authenticate = async (req, _, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    throw new Error();
  }
  const { _id } = jwt.verify(token, SECRET_JWT_KEY);
  const user = await User.findById(_id);
  if (!user || !user.token || user.token !== token) {
    throw new Error();
  }
  if (!user.verify) {
    throw HttpError(403, 'Email not verified');
  }
  req.user = user;
  next();
};

module.exports = wrapper(authenticate);
