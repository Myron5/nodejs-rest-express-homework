const HttpError = require("./HttpError");

const authWrapper = (authMiddleware) => {
  const func = async (req, res, next) => {
    try {
      await authMiddleware(req, res, next);
    } catch (error) {
      if (error.message) next(HttpError(401, error.message));
      next(HttpError(401));
    }
  };

  return func;
};

module.exports = authWrapper;
