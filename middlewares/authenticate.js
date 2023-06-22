const jwt = require("jsonwebtoken");
const { authWrapper } = require("../helpers");
const { User } = require("../models/user");

const { SECRET_JWT_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw new Error();
  }

  const { _id = null } = jwt.verify(token, SECRET_JWT_KEY);
  if (!_id) {
    throw new Error();
  }

  const user = await User.findById(_id);
  if (!user /* || !user.token || user.token !== token */) {
    throw new Error();
  }

  req.user = user;
  next();
};

module.exports = authWrapper(authenticate);
