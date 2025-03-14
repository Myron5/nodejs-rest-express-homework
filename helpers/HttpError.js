const errorMessageList = Object.freeze({
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Conflict',
  503: 'Service Unavailable',
});

const HttpError = (status, message = errorMessageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
